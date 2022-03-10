import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videosByDate: [],
  currentVideo: {},
  recorder: {
    currentFile: {},
    currentGifURL: "",
    isRecording: false,
  },
  meshes: [],
  func: null,
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
    updateRecordedVideo: (state, action) => {
      state.recorder = action.payload;

      return state;
    },
    resetRecorder: (state, action) => {
      state.recorder = initialState.recorder;

      return state;
    },
    setMeshes: (state, action) => {
      state.meshes = action.payload.meshes;

      return state;
    },
    setFunction: (state, action) => {
      state.func = action.payload.func;

      return state;
    },
  },
});

export const videoActions = videoSlice.actions;
export default videoSlice.reducer;
