import { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";
// import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { formatDate } from "../services/formatDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { buyCourse } from "../services/operations/studentFeaturesAPI";

import GetAvgRating from "../utils/avgRating";
import { ACCOUNT_TYPE } from './../utils/constants';
import { addToCart } from "../slices/cartSlice";

import { GiReturnArrow } from 'react-icons/gi';
import { MdOutlineVerified } from 'react-icons/md';
import Img from './../components/common/Img';
import toast from "react-hot-toast";
import bgImg from '../assets//Images/random bg img/img1.jpg'


function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting courseId from url parameter
  const { courseId } = useParams();
  // console.log(`course id: ${courseId}`);

  // Declare a state to save the course details
  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    // Calling fetchCourseDetails function to fetch the details
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

  // Collapse all
  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  // // Total number of lectures
  // const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  // useEffect(() => {
  //   let lectures = 0;
    // response?.data?.courseDetails?.courseContent?.forEach((sec) => {
  //     lectures += sec.subSection.length || 0;
  //   });
  //   setTotalNoOfLectures(lectures);
  // }, [response]);

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Loading skeleton
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

        {/* Floating Courses Card */}
        <div className="right-[1.5rem] top-[20%] hidden lg:block lg:absolute min-h-[450px] w-1/3 max-w-[410px] 
            translate-y-24 md:translate-y-0 rounded-xl skeleton">
        </div>

        <p className="mt-24 h-60 lg:w-[60%] rounded-xl skeleton"></p>
      </div>
    );
  }

  // extract course data
  const {
    courseName,
    courseDescription,
    thumbnailUrl,
    price,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
    // tag
  } = response;

  // Buy Course handler
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

  // Add to cart Course handler
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

  return (
    <>
      <div className={`relative w-full bg-richwhite-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-cente py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            {/* Go back button */}
            <div
              className="mb-5 lg:mt-10 lg:mb-0 z-[100]"
              onClick={() => navigate(-1)}
            >
              <GiReturnArrow className="w-10 h-10 text-yellow-100 hover:text-yellow-50 cursor-pointer" />
            </div>

            {/* will appear only for small size */}
            <div className="relative block max-h-[30rem] lg:hidden">
              <Img
                src={thumbnailUrl}
                alt="course thumbnail"
                className="aspect-auto w-full rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
            </div>

            {/* Course data */}
            <div
              className={`mb-5 flex flex-col justify-center gap-4 py-5 text-lg text-richwhite-5`}
            >
              <p className="text-4xl font-bold text-richwhite-5 sm:text-[42px]">
                {courseName}
              </p>
              <p className="text-richwhite-200">{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                {/* <span>{`(${ratingAndReviews.length} reviews)`}</span> */}
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>
              <p className="capitalize">
                {" "}
                Created By{" "}
                <span className="font-semibold underline">
                  {instructor.firstName} {instructor.lastName}
                </span>
              </p>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>

            {/* will appear only for small size */}
            {user?.accountType === ACCOUNT_TYPE.STUDENT ? (
              <div className="flex w-full flex-col gap-4 border-y border-y-richwhite-500 py-4 lg:hidden">
                <p className="space-x-3 pb-4 text-3xl font-semibold text-richwhite-5">
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
              <div className="flex flex-col gap-4">
                {/* <button
              onClick={() => navigate("/dashboard/{_id}/videos")}
              className="yellowButton outline-none"
            >
              Go to Videos
            </button> */}
              </div>
            ) : null}
          </div>

          {/* Floating Courses Card */}
          <div className="right-[1.5rem] top-[60px] mx-auto hidden lg:block lg:absolute min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0">
            <CourseDetailsCard
              course={response}
              thumbnail={thumbnailUrl ? thumbnailUrl : bgImg}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto box-content px-4 text-start text-richwhite-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          {/* <div className="my-8 border border-richwhite-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-3">
              {whatYouWillLearn && (
                whatYouWillLearn.split('\n').map((line, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <p className="font-bold">{index + 1}.</p>
                    <p className="ml-2">{line}</p>
                  </div>
                ))
              )}
            </div>
          </div> */}

          {/* Tags */}
          {/* <div className="flex flex-col lg:flex-row gap-4">
            <p className="text-xl font-bold">Tags</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {
                tag && tag.map((item, ind) => (
                  <p key={ind} className="bg-yellow-50 p-[2px] text-black rounded-full text-center font-semibold" >
                    {item}
                  </p>
                ))
              }
            </div>
          </div> */}

          {/* Course Content Section */}
          <div className="max-w-[830px] mt-9">
            {/* <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent.length} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>{response?.totalDuration} Total Time</span>
                </div>
                <button
                  className="text-yellow-25"
                  onClick={() => setIsActive([])}
                >
                  Collapse All Sections
                </button>
              </div>
            </div> */}

            {/* Course Details Accordion - section Subsection */}
            {/* <div className="py-4 ">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div> */}

            {/* Author Details */}
            <div className="mb-12 py-4">
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
                  <p className="text-richwhite-50">
                    {instructor?.additionalDetails?.about}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CourseDetails;
