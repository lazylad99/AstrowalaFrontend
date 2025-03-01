import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset, // Import the reset function
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    console.log("password Data - ", data)
    try {
      await changePassword(token, data)
      toast.success("Password Changed Successfully")
      reset() // Reset the form fields after successful submission
    } catch (error) {
      toast.error("Could Not Change Password, Try Again")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>

         <div className="my-3 flex flex-col gap-y-2 rounded-md border-[1px] border-richwhite-700 bg-newBlue p-8 px-6 sm:px-12">
          <h2 className="text-lg font-semibold text-white">Update Password</h2>

          <div className="flex flex-col gap-3 justify-evenly lg:flex-row">
            {/* Current Password */}
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className="text-white">
                Current Password
              </label>

              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="form-style"
                {...register("oldPassword", { required: true })}
              />

              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[45px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>

            {/* new password */}
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="text-white">
                New Password
              </label>

              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="form-style"
                {...register("newPassword", { required: true })}
              />

              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[45px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>

            {/*confirm new password */}
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="confirmNewPassword" className="text-white">
                Confirm New Password
              </label>

              <input
                type={showConfirmNewPassword ? "text" : "password"}
                name="confirmNewPassword"
                id="confirmNewPassword"
                placeholder="Enter Confirm New Password"
                className="form-style"
                {...register("confirmNewPassword", { required: true })}
              />

              <span
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                className="absolute right-3 top-[45px] z-[10] cursor-pointer"
              >
                {showConfirmNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.confirmNewPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Confirm New Password.
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2 m-3">
            <button
              onClick={() => {
                navigate("/dashboard/my-profile")
              }}
              className="cursor-pointer rounded-md bg-richblack-500 py-2 px-5 font-semibold text-white"
            >
              Cancel
            </button>
            <IconBtn type="submit" text="Update" />
          </div>
        </div>
      </form>
    </>
  )
}
