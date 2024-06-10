import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  video: null,         // To store a single video detail
  editVideo: false,    // To track if a video is being edited
  uploadLoading: false, // To track the loading state of video upload
  fetchLoading: false,  // To track the loading state of fetching videos
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setVideo: (state, action) => {
      state.video = action.payload;
    },
    setEditVideo: (state, action) => {
      state.editVideo = action.payload;
    },
    setUploadLoading: (state, action) => {
      state.uploadLoading = action.payload;
    },
    setFetchLoading: (state, action) => {
      state.fetchLoading = action.payload;
    },
    resetVideoState: (state) => {
      state.videos = [];
      state.video = null;
      state.editVideo = false;
      state.uploadLoading = false;
      state.fetchLoading = false;
    },
  },
});

export const {
  setVideos,
  setVideo,
  setEditVideo,
  setUploadLoading,
  setFetchLoading,
  resetVideoState,
} = videoSlice.actions;

export default videoSlice.reducer;
