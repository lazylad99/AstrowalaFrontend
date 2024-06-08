import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { videoEndpoints } from "../apis";

import axios from 'axios';

const API_BASE_URL = 'https://astrowala-backend-deployed.onrender.com';

const { UPLOAD_VIDEO_API } = videoEndpoints;

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

export const fetchVideoData = async (videoId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/video/${videoId}`);
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

export const fetchKeyInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getKeyInfo`);
    if (response?.data.success) {
      return response?.data.data ; // Set the fetched video data in state
    } else {
      console.error("Error fetching video:", response?.data.message);
    }
  } catch (error) {
    console.error("Error fetching video:", error);
  }
};


export const fetchCourseVideos = async (courseId, token) => {
 
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/video/all-videos/${courseId}`, {
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