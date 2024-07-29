import { toast } from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints



// ================ update User Profile Image  ================
export function updateUserProfileImage(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Image Uploading...")

    try {
      const response = await apiConnector(
        "PATCH",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Image Uploaded")
      dispatch(setUser(response.data.data));

      localStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
    }
    toast.dismiss(toastId)
  }
}

// ================ update Profile  ================
export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      // console.log("UPDATE_PROFILE_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const updatedUserDetails = response.data.updatedUserDetails;
      const userImage = updatedUserDetails.image
        ? updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`;

      const updatedUser = { ...updatedUserDetails, image: userImage };
      console.log("Updated User Details: ", updatedUser);

      dispatch(setUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Update Profile");
    }
    toast.dismiss(toastId);
  };
}


// ================ change Password  ================
export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}

// ================ delete Profile ================
export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}