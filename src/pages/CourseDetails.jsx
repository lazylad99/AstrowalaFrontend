import { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";

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
import bgImg from "../assets/Images/random bg img/img1.jpg"; // Ensure the image path is correct
import img2 from "../assets/Images/astro_images/video_bg.png";

import copy from "copy-to-clipboard";
import { FaShareSquare } from "react-icons/fa";
import IconBtn from "../components/common/IconBtn";
import Certificate from "../components/core/Dashboard/Certificate/Certificate";
import VideoModal from "../components/core/Catalog/VideoModal";

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
  const [avgReviewCount, setAvgReviewCount] = useState();
  useEffect(() => {
    const count = GetAvgRating(response?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [response]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (paymentLoading || loading || !response) {
    return (
      <div className={`mt-24 p-5 flex flex-col justify-center gap-4 bg-course-details`}>
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
    courseName = "",
    courseDescription = "",
    thumbnailUrl = "",
    price = 0,
    instructor = {},
    studentsEnrolled = [],
    createdAt = "",
    introductoryVideoUrl = "",
  } = response || {};

  const handleBuyCourse = () => {
    if (token) {
      const coursesId = [courseId];
      buyCourse(token, coursesId, user, navigate, dispatch);
      return;
    }
    toast.error("You are not logged in!");
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
    toast.error("You are not logged in!");
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleVideo = () => {
    setVideo(introductoryVideoUrl);
  };

  return (
    <div>
      <div className="w-full h-[200px] md:h-[750px] absolute top-0 left-0 overflow-hidden object-cover "></div>
      <div>
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div
              className={`mb-5 flex flex-col justify-center gap-4 py-5 text-lg text-black`}
            >
              {/* Breadcrumbs  */}
              <p className="text-sm text-black mb-2 mt-2">
                <Link to={"/"} className="hover:underline"> Home</Link>
                / 
                <span onClick={() => navigate(-1)} className="cursor-pointer hover:underline">
                  Categories
                </span> / 
                <span className="text-richblack-600">{courseName}</span>
              </p>
              {/* End of Breadcrumbs  */}

<div className="mt-10 bg-course-details p-10 rounded-xl shadow">
              <p className="text-4xl mt-2 font-bold text-black sm:text-[42px]">
                {courseName}
              </p>
              <p className="mb-2 text-black">{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-black mt-1">4.1</span>
                <RatingStars Review_Count={4.1} Star_Size={24} />
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>

                <div>
                  <button
                    className="mx-auto flex items-center gap-2 py-6 text-black"
                    onClick={handleShare}
                  >
                    <FaShareSquare size={15} /> Share
                  </button>
                </div>
              </div>
              <div className=" ">
                <p className="text-[28px] mt-10 font-semibold">Instructors</p>
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
                        <MdOutlineVerified className="w-5 h-5 text-[#699b1b]" />
                      </span>
                    </p>
                    <p>{instructor?.additionalDetails?.about}</p>
                  </div>
                </div>
              </div>
            </div>

            {user?.accountType === ACCOUNT_TYPE.STUDENT ? (
              <div className="flex w-full flex-col gap-4 border-y py-4 lg:hidden shadow">
                <p className="space-x-3 pb-4 text-3xl font-semibold text-black">
                  Rs. {price}
                </p>
                <button className="button-36" onClick={handleBuyCourse}>
                  Buy Now
                </button>
                <button onClick={handleAddToCart} className="button-36">
                  Add to Cart
                </button>
              </div>
            ) : user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? (
              <div className="flex flex-col gap-4"></div>
            ) : null}
          </div>

          <div className="right-[1.5rem] top-[60px] mx-auto hidden lg:block lg:absolute min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0">
            <div className="flex flex-col gap-4 rounded-2xl shadow-lg bg3 p-2 text-black">
              <div onClick={handleVideo} className="cursor-pointer relative">
                <Img
                  src={thumbnailUrl}
                  alt={courseName}
                  className="hidden rounded-2xl aspect-auto w-full max-h-[350px] lg:flex"
                />
                <img
                  src={img2}
                  alt="Overlay"
                  className="absolute rounded-2xl top-0 left-0 w-full h-full"
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
            </div>
          </div>
          </div>
        </div>
      </div>
      
      {video && <VideoModal videoUrl={video} setShowVideo={setVideo} />}
    </div>
  );
}

export default CourseDetails;
