import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";

const { UPLOAD_VIDEO_API } = courseEndpoints;

export const uploadVideo = async (formData, token) => {
  const toastId = toast.loading("Uploading video...");
  let result = null;

  try {
    const response = await apiConnector("POST", UPLOAD_VIDEO_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data) {
      throw new Error("Failed to upload video");  
    }
    console.log(response.data)
    
    result = response.data.video;
  } catch (error) {
    console.error("Error uploading video:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to upload video. Please try again.");
  }
  
  toast.dismiss(toastId);
  return result;
};
