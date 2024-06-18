import React from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShareSquare } from "react-icons/fa";
import { addToCart } from "../../../slices/cartSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Img from './../../common/Img';

function CourseDetailsCard({ course, thumbnail, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!course) {
    return null; // or some fallback UI
  }

  const {
    _id : _id,
    price: CurrentPrice,
  } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-richwhite-700 p-4 text-black">
      <Img
        src={thumbnail}
        alt={course?.courseName}
        className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
      />

      <div className="px-4">
        <div className="space-x-3 pb-4 text-3xl font-semibold">
          Rs. {CurrentPrice}
        </div>

        {/* Conditional rendering of buttons based on user's account type */}
        {user?.accountType === ACCOUNT_TYPE.STUDENT ? (
          <div className="flex flex-col gap-4">
            <button
              className="yellowButton outline-none"
              onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
              <button
                onClick={handleAddToCart}
                className="blackButton outline-none"
              >
                Add to Cart
              </button>
            )}
          </div>
        ) : user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/dashboard/{_id}/videos")}
              className="yellowButton outline-none"
            >
              Go to Videos
            </button>
          </div>
        ) : null}

        <div>
          <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100"></div>
        </div>

        <div className="text-center">
          <button
            className="mx-auto flex items-center gap-2 py-6 text-black"
            onClick={handleShare}
          >
            <FaShareSquare size={15} /> Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsCard;
