import { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "../services/formatDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { buyCourse } from "../services/operations/studentFeaturesAPI";

import GetAvgRating from "../utils/avgRating";
import { ACCOUNT_TYPE } from "./../utils/constants";
import { addToCart } from "../slices/cartSlice";

import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineVerified } from "react-icons/md";
import Img from "./../components/common/Img";
import toast from "react-hot-toast";
import bgImg from "../assets//Images/random bg img/img1.jpg";

import copy from "copy-to-clipboard";
import { FaShareSquare } from "react-icons/fa";
import IconBtn from "../components/common/IconBtn";
import Certificate from "../components/core/Dashboard/Certificate/Certificate";

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting courseId from url parameter
  const { courseId } = useParams();

  // Declare states
  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchCourseDetailsData = async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        console.log("course details res: ", res);
        setResponse(res?.data);
      } catch (error) {
        console.log("Could not fetch Course Details", error);
      }
    };
    fetchCourseDetailsData();
  }, [courseId]);

  // Calculating Avg Review count
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(response?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [response]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (paymentLoading || loading || !response) {
    return (
      <div className={`mt-24 p-5 flex flex-col justify-center gap-4`}>
        <div className="flex flex-col sm:flex-col-reverse gap-4">
          <p className="h-44 sm:h-24 sm:w-[60%] rounded-xl skeleton"></p>
          <p className="h-9 sm:w-[39%] rounded-xl skeleton"></p>
        </div>
        <p className="h-4 w-[55%] lg:w-[25%] rounded-xl skeleton"></p>
        <p className="h-4 w-[75%] lg:w-[30%] rounded-xl skeleton"></p>
        <p className="h-4 w-[35%] lg:w-[10%] rounded-xl skeleton"></p>
        <div className="right-[1.5rem] top-[20%] hidden lg:block lg:absolute min-h-[450px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 rounded-xl skeleton"></div>
        <p className="mt-24 h-60 lg:w-[60%] rounded-xl skeleton"></p>
      </div>
    );
  }

  const {
    _id,
    courseName,
    courseDescription,
    thumbnailUrl,
    price,
    instructor,
    studentsEnrolled,
    createdAt,
    introductoryVideoUrl,
  } = response;

  const handleBuyCourse = () => {
    if (token) {
      const coursesId = [courseId];
      buyCourse(token, coursesId, user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    if (token) {
      dispatch(addToCart(response));
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

  return (
    <>
      <div className={`relative w-full bg-richwhite-800`}>
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div
              className="mb-5 lg:mt-10 lg:mb-0 z-[100]"
              onClick={() => navigate(-1)}
            >
              <GiReturnArrow className="w-10 h-10 text-yellow-100 hover:text-yellow-50 cursor-pointer" />
            </div>

            <div className="relative block max-h-[30rem] lg:hidden">
              <Img
                src={thumbnailUrl}
                alt="course thumbnail"
                className="aspect-auto w-full rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
            </div>

            <div
              className={`mb-5 flex flex-col justify-center gap-4 py-5 text-lg text-white`}
            >
              <p className="text-4xl font-bold text-white sm:text-[42px]">
                {courseName}
              </p>
              <p className="text-richwhite-200">{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>
              <p className="capitalize">
                Created By{" "}
                <span className="font-semibold underline">
                  {instructor.firstName} {instructor.lastName}
                </span>
              </p>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>

            {user?.accountType === ACCOUNT_TYPE.STUDENT ? (
              <div className="flex w-full flex-col gap-4 border-y border-y-richwhite-500 py-4 lg:hidden">
                <p className="space-x-3 pb-4 text-3xl font-semibold text-white">
                  Rs. {price}
                </p>
                <button
                  className="yellowButton text-richblack-800"
                  onClick={handleBuyCourse}
                >
                  Buy Now
                </button>
                <button onClick={handleAddToCart} className="blackButton">
                  Add to Cart
                </button>
              </div>
            ) : user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? (
              <div className="flex flex-col gap-4"></div>
            ) : null}
          </div>

          <div className="right-[1.5rem] top-[60px] mx-auto hidden lg:block lg:absolute min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0">
            <div className="flex flex-col gap-4 rounded-2xl shadow-lg bg-richwhite-700 p-4 text-white">
              <div onClick={handleVideo} className="cursor-pointer">
                <Img
                  src={thumbnailUrl || bgImg}
                  alt={courseName}
                  className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
                />
              </div>
              {user?.accountType === ACCOUNT_TYPE.STUDENT ? (
                <div className="flex flex-col gap-4">
                  <IconBtn
                    onClick={
                      user && studentsEnrolled.includes(user?._id)
                        ? () => navigate("/dashboard/enrolled-courses")
                        : handleBuyCourse
                    }
                  >
                    {user && studentsEnrolled.includes(user?._id)
                      ? "Go To Course"
                      : "Buy Now"}
                  </IconBtn>

                  {(!user || !studentsEnrolled.includes(user?._id)) && (
                    <IconBtn onClick={handleAddToCart}>Add to Cart</IconBtn>
                  )}
                  {user && studentsEnrolled.includes(user?._id) ? (
                    <Certificate userId={user?._id} courseId={_id} />
                  ) : null}
                </div>
              ) : user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? (
                <div className="flex flex-col gap-4">
                  <IconBtn onClick={() => navigate("/dashboard/{_id}/videos")}>
                    Go to Videos
                  </IconBtn>
                </div>
              ) : null}

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
        </div>
      </div>
      <div className="mx-auto box-content px-4 bg-white text-start text-white lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* Author Details */}
          <div className=" py-4 text-black">
            <p className="text-[28px] font-semibold">Author</p>
            <div className="flex items-center gap-4 py-4">
              <Img
                src={instructor.image}
                alt="Author"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <p className="text-lg capitalize flex items-center gap-2 font-semibold">
                  {`${instructor.firstName} ${instructor.lastName}`}
                  <span>
                    <MdOutlineVerified className="w-5 h-5 text-[#00BFFF]" />
                  </span>
                </p>
                <p>{instructor?.additionalDetails?.about}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Close the main content container */}
      <Footer /> {/* This appears to be outside the main container div */}
      {video && (
        <ConfirmationModal modalData={modalData} videoUrl={video} isVideo />
      )}
    </>
  );
}

export default CourseDetails;
