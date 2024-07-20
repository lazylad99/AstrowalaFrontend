import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
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
      <div className="flex border-b border-richwhite-800 px-6 py-8 w-full">
        <div className="flex flex-1 gap-x-4">
          <div className="h-[148px] min-w-[300px] rounded-xl skeleton"></div>
          <div className="flex flex-col w-[40%]">
            <p className="h-5 w-[50%] rounded-xl skeleton"></p>
            <p className="h-20 w-[60%] rounded-xl mt-3 skeleton"></p>
            <p className="h-2 w-[20%] rounded-xl skeleton mt-3"></p>
            <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
          </div>
        </div>
      </div>
    );
  };

  if (enrolledCourses?.length === 0) {
    return (
      <p className="grid h-[50vh] w-full place-content-center text-center text-black text-3xl">
        You have not enrolled in any course yet.
      </p>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="bg-gradient-to-b font-semibold from-[#0b0b0b] via-[#464545] to-[#aaa8a8] text-transparent bg-clip-text text-4xl">
          Enrolled Courses
        </h1>
      </div>

      <Table className="rounded-2xl">
        <Thead>
          <Tr className="flex rounded-md px-6 py-2 shadow1 bg-black">
            <Th className="flex-1 text-left text-sm font-medium ml-[100px] uppercase text-white">
              Courses
            </Th>
          </Tr>
        </Thead>

        {!enrolledCourses ? (
          <div>
            {sklItem()}
            {sklItem()}
            {sklItem()}
          </div>
        ) : (
          <Tbody>
            {enrolledCourses.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-10 p-5 cursor-pointer m-10 shadow1 rounded-lg bg-white bg-opacity-15 transform hover:scale-105 transition-transform duration-300"
                onClick={() => navigate(`/dashboard/${course._id}/lectureVideos`)}
              >
                <Td className="flex flex-1 gap-x-4 relative">
                  <Img
                    src={course.thumbnailUrl}
                    alt={course.courseName}
                    className="h-[160px] min-w-[270px] max-w-[270px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-black capitalize">
                      {course.courseName}
                    </p>
                    <p className="text-md text-black">
                      {
                      // course.courseDescription.split(" ").length >
                      // TRUNCATE_LENGTH
                      //   ? course.courseDescription
                      //       .split(" ")
                      //       .slice(0, TRUNCATE_LENGTH)
                      //       .join(" ") + "..."
                      //   : 
                        course.courseDescription}
                    </p>
                    
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
    </>
  );
}
