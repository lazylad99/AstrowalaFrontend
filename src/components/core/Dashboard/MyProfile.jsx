import { useEffect } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";
import Img from "./../../common/Img";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="p-8 rounded-2xl border-[1px] border-richwhite-700 bg-richwhite-800">
      <div className="flex justify-between">
        <div>
          <h1 className="mb-8 text-4xl text-white font-semibold text-center sm:text-left">
            My Profile
          </h1>
        </div>
        <div>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex w-2/4  p-3 items-center flex-col">
          <Img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-squaremt-3 w-[150px] rounded-full object-cover"
          />
        </div>

        <div className=" my-3 mb-3">
          <div className="flex  items-center justify-between">
            <p className="text-xl font-semibold text-white capitalize">
              {user?.firstName + " " + user?.lastName}
            </p>{" "}
          </div>
          <div className="flex w-full items-center justify-between mt-1 mb-3">
            <p className="text-sm text-pure-greys-100">{user?.email}</p>
          </div>
          <div className="flex mt-5 w-full items-center justify-between">
            <p className="text-lg font-semibold text-white">About</p>
          </div>
          <p
            className={`${
              user?.additionalDetails?.about
                ? "text-white"
                : "text-pure-greys-100"
            } text-sm font-medium mt-2`}
          >
            {user?.additionalDetails?.about ?? "Write Something About Yourself"}
          </p>
        </div>
      </div>

      <div className="my-10">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-white">Personal Details</p>
        </div>

        <div className="flex max-w-[500px] justify-between mt-5">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-pure-greys-100">First Name</p>
              <p className="text-sm font-semibold text-white capitalize">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-pure-greys-100">Account Type</p>
              <p className="text-sm font-semibold text-white capitalize">
                {user?.accountType}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-pure-greys-100">Email</p>
              <p className="text-sm font-semibold text-white">{user?.email}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-pure-greys-100">Gender</p>
              <p className="text-sm font-semibold text-white">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-pure-greys-100">Last Name</p>
              <p className="text-sm font-semibold text-white capitalize">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-pure-greys-100">Phone Number</p>
              <p className="text-sm font-semibold text-white">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-pure-greys-100">Date Of Birth</p>
              <p className="text-sm font-semibold text-white">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
