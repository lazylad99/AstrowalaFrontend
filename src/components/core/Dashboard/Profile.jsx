import CardComponent from "../../common/CardComponent";
import { useEffect } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";
import Img from "./../../common/Img";

export default function Profile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex w-full flex-col gap-5 text-richblue-800">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-4 lg:!mb-0 ">
          <CardComponent
            extra={
              "items-center w-full h-3/4 p-[16px] bg-cover shadow1"
            }
          >
            {/* Background and profile */}
            <div className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover">
              <Img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-squaremt-3 w-[150px] rounded-full object-cover shadow1 "
              />
            </div>

            {/* Name and position */}
            <div className="mt-12 flex flex-col items-center text-richblue-800">
              <h4 className="text-xl font-bold text-navy-700">
                {user?.firstName + " " + user?.lastName}
              </h4>
              <p className="text-base font-normal text-gray-600">
                {user?.email}
              </p>
            </div>

            {/* Post followers */}
            <div className="mt-6 mb-3 flex gap-4 md:!gap-14 text-richblue-800">
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-navy-700">17</p>
                <p className="text-sm font-normal text-gray-600">Courses</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-navy-700">1.2K</p>
                <p className="text-sm font-normal text-gray-600">Student</p>
              </div>
              {/* <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700">
            434
          </p>
          <p className="text-sm font-normal text-gray-600">Following</p>
        </div> */}
            </div>
          </CardComponent>
        </div>

        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5 shadow1  rounded-2xl ">
          <CardComponent extra={"w-full h-full p-3  mb-3"}>
            {/* Header */}
            <div className="mt-2 mb-8 w-full text-richblue-800">
              <h4 className="px-2 text-xl font-bold text-navy-700">About</h4>
              <p className="mt-2 px-2 text-base text-gray-600">
                {user?.additionalDetails?.about ??
                  "Write Something About Yourself"}
              </p>
            </div>
            {/* Cards */}
            <div className="grid grid-cols-2 gap-4 px-2 text-richblue-800">
              <div className="flex flex-col items-start justify-center rounded-2xl bg-blue-25 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">First Name</p>
                <p className="text-base font-medium text-navy-700">
                  {user?.firstName}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-blue-25 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Last Name</p>
                <p className="text-base font-medium text-navy-700 ">
                  {user?.lastName}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-blue-25 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Account Type</p>
                <p className="text-base font-medium text-navy-700">
                {user?.accountType}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-blue-25 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Gender</p>
                <p className="text-base font-medium text-navy-700">
                  {user?.additionalDetails?.gender ?? "Add Gender"}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-blue-25 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Date Of Birth</p>
                <p className="text-base font-medium text-navy-700 ">
                  {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                    "Add Date Of Birth"}
                </p>
              </div>
              <div className="flex flex-col justify-center rounded-2xl bg-blue-25 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="text-base font-medium text-navy-700 ">
                  {user?.additionalDetails?.contactNumber ??
                    "Add Contact Number"}
                </p>
              </div>
            </div>
          </CardComponent>
        </div>
      </div>
    </div>
  );
}
