import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { videoEndpoints } from "../apis";
import axios from 'axios';
import { BASE_URL } from "../apis";

// const BASE_URL = 'https://astrowala-backend-deployed.onrender.com';
// const BASE_URL = 'http://localhost:5000';

const { UPLOAD_VIDEO_API, VIDEO_TOGGLE_PUBLISH_API } = videoEndpoints;


// ================ UPLOADING VIDEO ================

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



// ================ FETCHING VIDEO DATA ================

export const fetchVideoData = async (videoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/video/${videoId}`);
    if (response?.data.success) {
      return response?.data.data;
    } else {
      throw new Error(response?.data.message);
    }
  } catch (error) {
    console.error("Error fetching video:", error);
    throw error;
  }
};



// ================ FETCHING KEY INFO ================

// export const fetchKeyInfo = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/getKeyInfo`);
//     if (response?.data.success) {
//       return response?.data.data ; // Set the fetched video data in state
//     } else {
//       console.error("Error fetching video:", response?.data.message);
//     }
//   } catch (error) {
//     console.error("Error fetching video:", error);
//   }
// };



// ================ FETCHING COURSE VIDEOS ================

export const fetchCourseVideos = async (courseId, token) => {
 
  try {
    const response = await axios.get(`${BASE_URL}/video/all-videos/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data.data;
  } catch (error) {
    console.error("Error fetching course videos:", error);
    return [];
  }
};


// ================= VIDEO TOGGLE PUBLISH =================================

export const toggleVideoPublishStatus = async (videoId, token) => {
  try {
    const response = await apiConnector("PATCH", VIDEO_TOGGLE_PUBLISH_API.replace(':videoId', videoId), {}, {
      Authorization: `Bearer ${token}`,
    });
    console.log("response", response);
    if (response.data.success) {
      console.log('Publish status toggled successfully:');
    } else {
      console.error('Failed to toggle publish status:');
    }
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};


// ================ EDITING VIDEO ================

export const updateVideo = async (videoId, formData, token) => {
  const toastId = toast.loading("Updating video...");
  let result = null;

  try {
    const response = await apiConnector("PUT", `${BASE_URL}/video/update/${videoId}`, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("RESPONSE", response)

    if (!response?.data) {
      throw new Error("Failed to update video");
    }
    console.log(response.data);

    result = response.data.video;
    toast.success("Video updated successfully.");
  } catch (error) {
    console.error("Error updating video:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to update video. Please try again.");
  }

  toast.dismiss(toastId);
  return result;
};
