import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";
import Img from "./../../common/Img";
import { ACCOUNT_TYPE } from "../../../utils/constants";

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;
  // console.log('user data from store = ', user )

  return (
    // only for large devices

    <button className="relative hidden sm:flex" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <Img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className={"aspect-square w-[30px] rounded-full object-cover"}
        />
        <AiOutlineCaretDown className="text-sm text-white" />
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-white overflow-hidden rounded-md border-[1px] border-white bg-black"
          ref={ref}
        >
          <Link
            to={
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
                ? "/dashboard/instructor"
                : "/dashboard/my-profile"
            }
            onClick={() => setOpen(false)} // Assuming setOpen is a state updater function
          >
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-white hover:bg-white hover:text-black">
              <VscDashboard className="text-lg" />{" "}
              {/* Assuming VscDashboard is an icon component */}
              {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
                ? "Dashboard"
                : "My Profile"}
            </div>
          </Link>

          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-white hover:bg-white hover:text-black"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
