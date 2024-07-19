// CourseCardSmallScreen.js

import React from "react";
import { formatDate } from "../../../../services/formatDate";
import { FaCheck } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import Img from "../../../common/Img";
import IconBtn from "../../../common/IconBtn";

const CourseCardSmallScreen = ({ course, onClick }) => {
  const TRUNCATE_LENGTH = 25;

  return (
    <div
      className="flex gap-x-10 p-5 cursor-pointer m-10 shadow1 rounded-lg bg-white bg-opacity-15 transform hover:scale-105 transition-transform duration-300 "
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <Img
          src={course?.thumbnailUrl}
          alt={course?.courseName}
          className="h-[160px] min-w-[270px] max-w-[270px] rounded-lg object-cover"
        />
        <div className="flex flex-col items-center gap-y-2">
          <p className="text-lg font-semibold text-black capitalize">
            {course.courseName}
          </p>
          <p className="text-sm text-black">₹{course.price}</p>
          {!course.isPublished ? (
            <p className="flex items-center gap-2 rounded-full bg-black px-2 py-[2px] text-[12px] font-medium text-pink-25">
              <HiClock size={14} /> Unpublished
            </p>
          ) : (
            <div className="flex items-center gap-2 rounded-full bg-black px-2 py-[2px] text-[12px] font-medium text-blue-25">
              <p className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-5 text-black">
                <FaCheck size={8} />
              </p>{" "}
              Published
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCardSmallScreen;
