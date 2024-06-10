import { useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../services/formatDate";
import {
  // deleteCourse,
  fetchInstructorCourses,
  togglePublishStatus, // Import the new API function
} from "../../../../services/operations/courseDetailsAPI";
import ConfirmationModal from "../../../common/ConfirmationModal";
import Img from "../../../common/Img";
import IconBtn from "../../../common/IconBtn";
import toast from "react-hot-toast";
import Tab from "../../../common/Tab";

export default function CoursesTable({
  courses,
  setCourses,
  loading,
  setLoading,
}) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [field, setField] = useState("Published"); // State to toggle published/unpublished courses
  const TRUNCATE_LENGTH = 25;

  const tabData = [
    { id: 1, type: "Published", tabName: "Published" },
    { id: 2, type: "Drafted", tabName: "Drafted" },
  ];

  // const handleCourseDelete = async (courseId) => {
  //   setLoading(true);
  //   const toastId = toast.loading("Deleting...");
  //   await deleteCourse({ courseId: courseId }, token);
  //   const result = await fetchInstructorCourses(token);
  //   if (result) {
  //     setCourses(result);
  //   }
  //   setConfirmationModal(null);
  //   setLoading(false);
  //   toast.dismiss(toastId);
  // };

  const toggleCoursePublishStatus = async (courseId) => {
    console.log(courseId);
    setLoading(true);
    const toastId = toast.loading("Updating status...");
    const result = await togglePublishStatus(courseId, token);
    if (result.success) {
      toast.success(result.message);
      const updatedCourses = await fetchInstructorCourses(token);
      setCourses(updatedCourses);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
    toast.dismiss(toastId);
  };

  const skItem = () => (
    <div className="flex border-b border-richwhite-800 px-6 py-8 w-full">
      <div className="flex flex-1 gap-x-4 ">
        <div className="h-[148px] min-w-[300px] rounded-xl skeleton "></div>
        <div className="flex flex-col w-[40%]">
          <p className="h-5 w-[50%] rounded-xl skeleton"></p>
          <p className="h-20 w-[60%] rounded-xl mt-3 skeleton"></p>
          <p className="h-2 w-[20%] rounded-xl skeleton mt-3"></p>
          <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
        </div>
      </div>
    </div>
  );

  const filteredCourses = courses.filter((course) =>
    field === "Published" ? course.isPublished : !course.isPublished
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-richwhite-100">Courses</h1>
        <Tab tabData={tabData} field={field} setField={setField} />
      </div>

      <Table className="rounded-2xl border border-richwhite-800 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-3xl border-b border-b-richwhite-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richwhite-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richwhite-100">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richwhite-100">
              Price
            </Th>
            <Th className="text-left ml-2 mr-10 text-sm font-medium uppercase text-richwhite-100">
              Actions
            </Th>
          </Tr>
        </Thead>

        {loading ? (
          <div>
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        ) : (
          <Tbody>
            {filteredCourses?.length === 0 ? (
              <Tr>
                <Td className="py-10 text-center text-2xl font-medium text-richwhite-100">
                  No courses found
                </Td>
              </Tr>
            ) : (
              filteredCourses.map((course) => (
                <Tr
                  key={course._id}
                  className="flex gap-x-10 border-b border-richwhite-800 px-6 py-8 cursor-pointer"
                  onClick={() => navigate(`/dashboard/${course._id}/videos`)}
                >
                  <Td className="flex flex-1 gap-x-4 relative">
                    <Img
                      src={course?.thumbnailUrl}
                      alt={course?.courseName}
                      className="h-[148px] min-w-[270px] max-w-[270px] rounded-lg object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold text-richwhite-5 capitalize">
                        {course.courseName}
                      </p>
                      <p className="text-xs text-richwhite-300 ">
                        {course.courseDescription.split(" ").length >
                        TRUNCATE_LENGTH
                          ? course.courseDescription
                              .split(" ")
                              .slice(0, TRUNCATE_LENGTH)
                              .join(" ") + "..."
                          : course.courseDescription}
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Aspernatur dicta ratione, autem quia iusto aut
                        voluptatem nihil illo minima harum vero iure at
                        repudiandae sed deserunt alias! Cupiditate, et
                        doloribus.
                      </p>
                      <p className="text-[12px] text-richwhite-100 mt-4">
                        Created: {formatDate(course?.createdAt)}
                      </p>
                      <p className="text-[12px] text-richwhite-100">
                        Updated: {formatDate(course?.updatedAt)}
                      </p>
                      {!course.isPublished ? (
                        <p className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-richwhite-700 px-2 py-[2px] text-[12px] font-medium text-pink-500">
                          <HiClock size={14} /> Drafted
                        </p>
                      ) : (
                        <div className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-richwhite-700 px-2 py-[2px] text-[12px] font-medium text-yellow-50">
                          <p className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-50 text-richwhite-700">
                            <FaCheck size={8} />
                          </p>{" "}
                          Published
                        </div>
                      )}
                    </div>
                  </Td>
                  <Td className="text-sm font-medium text-richwhite-100">
                    2hr 30min
                  </Td>
                  <Td className="text-sm font-medium text-richwhite-100">
                    ₹{course.price}
                  </Td>
                  <Td className="flex flex-col text-sm font-medium text-richwhite-100 ">
                    <div className="flex pb-5">
                      <button
                        disabled={loading}
                        onClick={(event) => {
                          event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
                          navigate(`/dashboard/edit-course/${course._id}`);
                        }}
                        title="Edit"
                        className="px-5 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300 "
                      >
                        <FiEdit2 size={20} />
                      </button>
                      <button
                        disabled={loading}
                        // onClick={(event) => {
                        //   event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
                        //   setConfirmationModal({
                        //     text1: "Do you want to delete this course?",
                        //     text2:
                        //       "All the data related to this course will be deleted",
                        //     btn1Text: !loading ? "Delete" : "Loading...",
                        //     btn2Text: "Cancel",
                        //     btn1Handler: !loading
                        //       ? () => handleCourseDelete(course._id)
                        //       : () => {},
                        //     btn2Handler: !loading
                        //       ? () => setConfirmationModal(null)
                        //       : () => {},
                        //   });
                        // }}

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
                    <div>
                      <button
                        onClick={(event) => {
                          event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
                          navigate(`/dashboard/${course._id}/add-videos`);
                        }}
                        className="z-40 m-4"
                      >
                        <IconBtn text="Add Videos"></IconBtn>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={(event) => {
                          event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
                          toggleCoursePublishStatus(course._id); // Call the function to toggle publish status
                        }}
                        className="z-40 m-4"
                      >
                        <IconBtn
                          text={
                            !course.isPublished
                              ? "Publish Course"
                              : "Draft Course"
                          }
                        ></IconBtn>
                      </button>
                    </div>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        )}
      </Table>

      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : null}
    </>
  );
}
