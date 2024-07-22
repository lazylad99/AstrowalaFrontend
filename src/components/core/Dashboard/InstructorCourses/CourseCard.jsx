import { formatDate } from "../../../../services/formatDate";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Img from "../../../common/Img";
import IconBtn from "../../../common/IconBtn";

function CourseCard({ course, toggleCoursePublishStatus, loading, setConfirmationModal }) {
  const navigate = useNavigate();
  const TRUNCATE_LENGTH = 25;

  return (
    <div className="flex flex-col gap-4 p-4 m-4 shadow-md rounded-lg bg-white"
    onClick={() => navigate(`/dashboard/${course._id}/videos`)}

    >
      <Img
        src={course?.thumbnailUrl}
        alt={course?.courseName}
        className="h-[160px] w-full rounded-lg object-cover"
      />
      <div className="flex flex-col">
        <p className="text-lg font-semibold text-black capitalize">
          {course.courseName}
        </p>
        <p className="text-xs text-black">
          {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
            ? course.courseDescription
                .split(" ")
                .slice(0, TRUNCATE_LENGTH)
                .join(" ") + "..."
            : course.courseDescription}
        </p>
        <p className="text-[12px] text-black mt-4">
          Created: {formatDate(course?.createdAt)}
        </p>
        {course?.updatedAt && (
          <p className="text-[12px] text-black">
            Updated: {formatDate(course?.updatedAt)}
          </p>
        )}
        <div className="flex justify-between">
            <div>
        {!course.isPublished ? (
          <p className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-black px-2 py-[2px] text-[12px] font-medium text-pink-25">
            <HiClock size={14} /> Unpublished
          </p>
        ) : (
          <div className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-black px-2 py-[2px] text-[12px] font-medium text-blue-25">
            <p className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-5 text-black">
              <FaCheck size={8} />
            </p>{" "}
            Published
          </div>
        )}</div>
        
         <div className="flex">
          <button
            disabled={loading}
            onClick={(event) => {
              event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
              navigate(`/dashboard/edit-course/${course._id}`);
            }}
            title="Edit"
            className="px-5 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
          >
            <FiEdit2 size={20} />
          </button>
          <button
            disabled={loading}
            onClick={(event) => {
              event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
              toggleCoursePublishStatus(course._id); // Call the function to toggle publish status
            }}
            title="Delete"
            className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
          >
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
        
        </div>
       
        <div className="mt-2 flex gap-4">
          <button
            onClick={(event) => {
              event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
              navigate(`/dashboard/${course._id}/add-videos`);
            }}
            className="w-full"
          >
            <IconBtn text="Add Videos"></IconBtn>
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
              setConfirmationModal({
                text1: `Are you sure you want to ${
                  course.isPublished ? "unpublish" : "publish"
                } this course?`,
                text2: "",
                btn1Text: !loading ? "Yes" : "Loading...",
                btn2Text: "Cancel",
                btn1Handler: !loading
                  ? () => {
                      toggleCoursePublishStatus(course._id, !course.isPublished);
                      setConfirmationModal(null);
                    }
                  : () => {},
                btn2Handler: !loading
                  ? () => setConfirmationModal(null)
                  : () => {},
              });
            }}
            className="w-full"
          >
            <IconBtn
              text={!course.isPublished ? "Publish Course" : "Unpublish Course"}
            ></IconBtn>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
