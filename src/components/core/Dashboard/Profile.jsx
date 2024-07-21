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
  console.log(user);
  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-5 text-black">
      <div className="w-[80%] mt-3 flex h-fit flex-col gap-5">
        <div className="col-span-12 lg:col-span-8 3xl:col-span-5 shadow rounded-2xl">
          <CardComponent extra="w-full h-full p-3 mb-3 bg-white">
            {/* Background and profile */}
            <div className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover">
              <Img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square mt-3 w-[150px] rounded-full object-cover shadow1"
              />
            </div>

            {/* Name and position */}
            <div className="mt-12 flex flex-col items-center text-black">
              <h4 className="text-xl font-bold text-navy-700">
                {user?.firstName + " " + user?.lastName}
              </h4>
              <p className="text-base font-normal text-gray-600">
                {user?.email}
              </p>
            </div>

            {/* Header */}
            <div className="mt-2 mb-8 w-full text-black">
              <div className="flex justify-between">
                <h4 className="px-2 text-xl font-bold text-navy-700">About</h4>
                <div
                  className="pr-5 cursor-pointer"
                  onClick={() => navigate("/dashboard/edit-profile")}
                >
                  <RiEditBoxLine />
                </div>
              </div>
              <p className="mt-2 px-2 text-base text-gray-600">
                {user?.additionalDetails?.about ??
                  "Write Something About Yourself"}
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 text-white">
              <div className="flex flex-col items-start justify-center rounded-2xl bg-richblack-400 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Name</p>
                <p className="text-base font-medium text-navy-700">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-richblack-400 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Gender</p>
                <p className="text-base font-medium text-navy-700">
                  {user?.additionalDetails?.gender ?? "Add Gender"}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-richblack-400 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Date Of Birth</p>
                  {/* <RiEditBoxLine
                    className="ml-2 cursor-pointer text-white"
                    onClick={() => navigate("/dashboard/edit-profile")}
                  /> */}
                </div>
                <div className="flex items-center">
                  <p className="  text-base font-medium text-navy-700">
                    {formattedDate(user?.additionalDetails?.dob) ??
                      "Add Date Of Birth"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-richblack-400 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="text-base font-medium text-navy-700">
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
