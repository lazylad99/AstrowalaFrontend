//CourseDetailsCard.jsx

import { useState } from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShareSquare } from "react-icons/fa";
import { addToCart } from "../../../slices/cartSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Img from "./../../common/Img";
import IconBtn from "../../common/IconBtn";
import Certificate from "../Dashboard/Certificate/Certificate";
import ConfirmationModal from "../../common/ConfirmationModal";

function CourseDetailsCard({
  course,
  thumbnail,
  setConfirmationModal,
  handleBuyCourse,
}) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [video, setVideo] = useState(null);

  if (!course) {
    return null;
  }

  const {
    _id: _id,
    price: CurrentPrice,
    introductoryVideoUrl: introductoryVideoUrl,
  } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleVideo = () => {
    setVideo(introductoryVideoUrl);
  };

  const modalData = {
    btn2Text: "Cancel",
    btn2Handler: () => setVideo(null),
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

  const handleGoToCourse = () => {
    navigate(`/dashboard/${_id}/videos`);
  };

  const handleGoToVideos = () => {
    navigate(`/dashboard/${_id}/videos`);
  };

  return (
    <>
      <div className="flex flex-col w-1/2 p-8 gap-2 rounded-2xl shadow-lg bg-richblue-800 border-richblue-800 rounded-2xl text-white">
        <div onClick={handleVideo} className="cursor-pointer">
          <Img
            src={thumbnail}
            alt={course?.courseName}
            className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
          />
        </div>
        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {CurrentPrice}
          </div>

          {user?.accountType === ACCOUNT_TYPE.STUDENT ? (
            <div className="flex flex-col gap-4">
              <IconBtn
                onClick={
                  user && studentsEnrolled.includes(user?._id)
                    ? handleGoToCourse
                    : handleBuyCourse
                }
              >
                {user && studentsEnrolled.includes(user?._id)
                  ? "Go To Course"
                  : "Buy Now"}
              </IconBtn>

              {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
                <IconBtn onClick={handleAddToCart}>Add to Cart</IconBtn>
              )}
              {user && course?.studentsEnrolled.includes(user?._id) ? (
                <div>
                  <Certificate userId={user?._id} courseId={course?._id} />
                </div>
              ) : null}
            </div>
          ) : user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? (
            <div className="flex flex-col gap-4">
              <IconBtn onClick={handleGoToVideos}>Go to Videos</IconBtn>
            </div>
          ) : null}

          <div>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100"></div>
          </div>

          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-white"
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
      {video && (
        <ConfirmationModal videoUrl={video} isVideo modalData={modalData} />
      )}
    </>
  );
}

export default CourseDetailsCard;
