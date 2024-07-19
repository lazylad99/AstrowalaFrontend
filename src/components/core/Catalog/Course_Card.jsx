import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";
import Img from './../../common/Img';

function Course_Card({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <div
      className={`relative flex flex-col mt-6 mb-3 text-gray-700 text-black bg-course-details shadow shadow-md bg-clip-border rounded-xl w-96 transition-all duration-200 ${
        isHovered ? "hover:scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 ${isHovered ? "transform rotateY-180" : ""}`}>
        <div className={`absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 flex flex-col justify-center items-center ${isHovered ? "transform rotateY-180" : ""}`}>
          <h3 className="text-2xl font-semibold">{course?.courseName}</h3>
          <p className="text-gray-600">{course?.description}</p>
        </div>
        <Img
          src={course?.thumbnailUrl}
          alt="course thumbnail"
          className={`${Height} w-full object-cover transition-all duration-300 transform ${isHovered ? "rotateY-180" : ""}`}
        />
      </div>
      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal truncate">
          {course?.courseName}
        </h5>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {course?.instructor?.firstName} {course?.instructor?.lastName}
        </p>
      </div>
      <div className="p-6 pt-0">
        <div className="flex items-center gap-2">
          <span className="text-yellow-500">{avgReviewCount || 0}</span>
          <RatingStars Review_Count={avgReviewCount} />
          <span className="text-pink-600">
            {course?.ratingAndReviews?.length} Ratings
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-xl">Rs. {course?.price}</p>
          <Link to={`/courses/${course._id}`}>
            <button
              className=" button-36 "
              type="button"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Course_Card;
