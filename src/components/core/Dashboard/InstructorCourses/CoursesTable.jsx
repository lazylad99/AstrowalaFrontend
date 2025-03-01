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
  deleteCourse,
  fetchInstructorCourses,
  togglePublishStatus,
} from "../../../../services/operations/courseDetailsAPI";
import ConfirmationModal from "../../../common/ConfirmationModal";
import Img from "../../../common/Img";
import IconBtn from "../../../common/IconBtn";
import toast from "react-hot-toast";
import Tab from "../../../common/Tab";
import CourseCard from "./CourseCard";
import Modal from "../../../../components/common/Modal";
// import EnrollStudentsForm from "./EnrollStudentsForm";

export default function CoursesTable({
  courses,
  setCourses,
  loading,
  setLoading,
}) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [field, setField] = useState("Published"); // State to toggle published/unpublished courses
  const TRUNCATE_LENGTH = 25;
  const [showModal, setShowModal] = useState(false);

  const tabData = [
    { id: 1, type: "Published", tabName: "Published" },
    { id: 2, type: "Unpublished", tabName: "Unpublished" },
  ];

  const toggleCoursePublishStatus = async (courseId, newStatus) => {
    setLoading(true);
    const toastId = toast.loading("Updating status...");
    const result = await togglePublishStatus(courseId, token);
    if (result.success) {
      toast.success(result.message);
      const updatedCourses = await fetchInstructorCourses(token);
      setCourses(updatedCourses);
      setField(newStatus ? "Published" : "Unpublished");
    } else {
      toast.error(result.message);
    }
    setLoading(false);
    toast.dismiss(toastId);
  };

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    const toastId = toast.loading("Deleting...");
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
    toast.dismiss(toastId);
  };

  // const handleEnrollStudents = (formData) => {
  //   console.log("Form Data:", formData);
  //   // Handle form submission logic here, like calling an API to save the data
  //   setShowModal(false);
  // };

  
  const skItem = () => (
    <div className="flex border-b border-black px-6 py-8 w-full">
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
        <h1 className="bg-gradient-to-b font-semibold from-[#0b0b0b] via-[#464545] to-[#aaa8a8] text-transparent bg-clip-text lg:text-4xl text-3xl ">
          My Courses
        </h1>
        <Tab tabData={tabData} field={field} setField={setField} />
      </div>

      <div className="hidden md:block">
        <Table className="rounded-2xl ">
          <Thead>
            <Tr className="flex rounded-md px-6 py-2 shadow1 bg-newBlue">
              <Th className="flex-1 text-left text-sm font-medium ml-[100px] uppercase text-white">
                Courses
              </Th>
              <Th className="text-left mr-[100px] text-sm font-medium uppercase text-white">
                Price
              </Th>
              <Th className="text-left ml-2 mr-[120px] text-sm font-medium uppercase text-white">
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
                  <Td className="py-10 text-center text-2xl font-medium text-black">
                    No courses found
                  </Td>
                </Tr>
              ) : (
                filteredCourses.map((course) => (
                  <Tr
                    key={course._id}
                    className="flex gap-x-10 p-5 cursor-pointer m-10 shadow1 rounded-lg bg-white bg-opacity-15 transform hover:scale-105 transition-transform duration-300 "
                    onClick={() => navigate(`/dashboard/${course._id}/videos`)}
                  >
                    <Td className="flex flex-1 gap-x-4 relative">
                      <Img
                        src={course?.thumbnailUrl}
                        alt={course?.courseName}
                        className="h-[160px] min-w-[270px] max-w-[270px] rounded-lg object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold text-black capitalize">
                          {course.courseName}
                        </p>
                        <p className="text-xs text-black ">
                          {course.courseDescription.split(" ").length >
                          TRUNCATE_LENGTH
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
                        {!course.isPublished ? (
                          <p className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-newBlue px-2 py-[2px] text-[12px] font-medium text-pink-25">
                            <HiClock size={14} /> Unpublished
                          </p>
                        ) : (
                          <div className="mt-2 flex w-fit flex-row items-center gap-2 rounded-full bg-newBlue  px-2 py-[2px] text-[12px] font-medium text-blue-25">
                            <p className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-5 text-black">
                              <FaCheck size={8} />
                            </p>{" "}
                            Published
                          </div>
                        )}
                      </div>
                    </Td>
                    <Td className="text-sm font-medium mr-[20px] text-black">
                      ₹{course.price}
                    </Td>
                    <Tr className="flex flex-col text-sm font-medium text-black ">
                      <div className="flex ">
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
                        {/* <button
                          disabled={loading}
                          onClick={(event) => {
                            event.stopPropagation(); 
                            toggleCoursePublishStatus(course._id); 
                          }}
                          title="Delete"
                          className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                        >
                          <RiDeleteBin6Line size={20} />
                        </button> */}

                        <button
                          disabled={loading}
                          onClick={(event) => {
                            event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
                            setConfirmationModal({
                              text1: "Do you want to delete this course?",
                              text2:
                                "All the data related to this course will be deleted",
                              btn1Text: !loading ? "Delete" : "Loading...",
                              btn2Text: "Cancel",
                              btn1Handler: !loading
                                ? () => handleCourseDelete(course._id)
                                : () => {},
                              btn2Handler: !loading
                                ? () => setConfirmationModal(null)
                                : () => {},
                            });
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
                          className="z-40 m-2"
                        >
                          <IconBtn
                            customClasses={"h-[40px] w-[195px] mt-4"}
                            text="Add Videos"
                          ></IconBtn>
                        </button>
                      </div>
                      <div>
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
                                    toggleCoursePublishStatus(
                                      course._id,
                                      !course.isPublished
                                    );
                                    setConfirmationModal(null);
                                  }
                                : () => {},
                              btn2Handler: !loading
                                ? () => setConfirmationModal(null)
                                : () => {},
                            });
                          }}
                          className="z-40 m-2"
                        >
                          <IconBtn
                          customClasses = {"h-[40px] w-[195px]"}
                            text={
                              !course.isPublished
                                ? "Publish Course"
                                : "Unpublish Course"
                            }
                          ></IconBtn>
                        </button>
                        {/* <IconBtn customClasses={'h-[40px] w-[195px] z-40 m-2'} onclick={(event) =>{
                          event.stopPropagation(); // Stop the event from bubbling up to the row's onClick
                           setShowModal(true)}}>
                          Enroll Students
                        </IconBtn> */}
                      </div>
                    </Tr>
                  </Tr>
                ))
              )}
            </Tbody>
          )}
        </Table>
      </div>

      <div className="block md:hidden">
        {loading ? (
          <div>
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        ) : (
          filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              toggleCoursePublishStatus={toggleCoursePublishStatus}
              loading={loading}
              setConfirmationModal={setConfirmationModal}
            />
          ))
        )}
      </div>

      {/* <Modal showModal={showModal} setShowModal={setShowModal}>
  <EnrollStudentsForm setShowModal={setShowModal} courses={courses} />
</Modal> */}


      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
