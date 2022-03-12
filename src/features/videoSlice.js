import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videosByDate: [],
  currentVideo: {},
  recorder: {
    runTime: "",
  },
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videosByDate = action.payload.videos;

      return state;
    },
    updateCurrentVideo: (state, action) => {
      state.currentVideo = action.payload.video;

      return state;
    },
    updateRecorder: (state, action) => {
      state.recorder = action.payload;

      return state;
    },
    resetRecorder: (state, action) => {
      state.recorder = initialState.recorder;

      return state;
    },
  },
});

export const videoActions = videoSlice.actions;
export default videoSlice.reducer;
