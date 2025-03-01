import { useEffect, useState } from "react";
// import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import Img from "./../../common/Img";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const TRUNCATE_LENGTH = 25;

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  // fetch all users enrolled courses
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
      console.log(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  // Loading Skeleton
  const sklItem = () => {
    return (
      <div className="flex border border-richwhite-100 px-5 py-3 w-full">
        <div className="flex flex-1 gap-x-4 ">
          <div className="h-14 w-14 rounded-lg skeleton "></div>

          <div className="flex flex-col w-[40%] ">
            <p className="h-2 w-[50%] rounded-xl  skeleton"></p>
            <p className="h-2 w-[70%] rounded-xl mt-3 skeleton"></p>
          </div>
        </div>

        <div className="flex flex-[0.4] flex-col ">
          <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
          <p className="h-2 w-[40%] rounded-xl skeleton mt-3"></p>
        </div>
      </div>
    );
  };

  // return if data is null
  if (enrolledCourses?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center rounded-md h-[75vh] p-6 py-20">
        <p className="w-full place-content-center text-center text-black text-3xl">
          You have not enrolled in any course yet.
        </p>

        <Link to="/categories">
          <button className="button-36">Buy Course</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="bg-gradient-to-b font-semibold from-[#0b0b0b] via-[#464545] to-[#424141] text-transparent bg-clip-text text-4xl">
        Enrolled Courses
      </h1>
      <div className="my-8 text-black">
        {/* Headings */}
        <div className="flex rounded-t-2xl text-white bg-newBlue ">
          <p className="w-full px-5 py-3">Course Name</p>
          {/* <p className="w-1/4 px-2 py-3">Duration</p> */}
          {/* <p className="flex-1 px-2 py-3">Progress</p> */}
        </div>

        {/* loading Skeleton */}
        {!enrolledCourses && (
          <div>
            {sklItem()}
            {sklItem()}
            {sklItem()}
            {sklItem()}
            {sklItem()}
          </div>
        )}

        {/* Course Names */}
        {enrolledCourses?.map((course, i, arr) => (
          <div
            className={`flex flex-col sm:flex-row sm:items-center gap-x-10 p-5 bg-white cursor-pointer m-10 shadow1 rounded-lg transform hover:scale-105 transition-transform duration-300 ${
              i === arr.length - 1 ? "rounded-b-2xl" : "rounded-none"
            }`}
            key={i}
          >
            <div
              className="flex flex-col sm:flex-row sm:items-center gap-4 w-full cursor-pointer"
              onClick={() => navigate(`/dashboard/${course._id}/videos`)}
            >
              <Img
                src={course.thumbnailUrl}
                alt="course_img"
                className=" pr-4 sm:pr-0 h-[148px] min-w-[270px] max-w-[270px] rounded-lg object-cover mb-4 sm:mb-0"
              />

              <div className="flex flex-col w-full">
                <p className="text-lg font-semibold capitalize">
                  {course.courseName}
                </p>
                <p className="pb-4">
                  {
                    // course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                    //   ? course.courseDescription
                    //       .split(" ")
                    //       .slice(0, TRUNCATE_LENGTH)
                    //       .join(" ") + "..."
                    //   :
                    course.courseDescription
                  }
                </p>
              </div>
            </div>

            {/* only for smaller devices */}
            {/* duration - progress */}
            <div className="sm:hidden">
              <div className="px-2 py-3">{course?.totalDuration}</div>

              <div className="flex sm:w-2/5 flex-col gap-2 px-2 py-3">
                {/* Progress bar or other details here */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
