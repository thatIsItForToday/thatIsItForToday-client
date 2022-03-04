import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videosByDate: [],
  recorder: {
    currentFile: {},
    currentGifURL: "",
    isRecording: false,
  },
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    updateRecordedVideo: (state, action) => {
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
