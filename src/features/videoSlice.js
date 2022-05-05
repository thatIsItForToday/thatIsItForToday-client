import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

const initialState = {
  videosByDate: [],
  currentVideo: {},
  recorder: {
    runTime: "",
  },
};

const fetchUserVideos = createAsyncThunk(
  "videos/fetchUserVideos",
  async userId => {
    try {
      const { data } = await api.getUserVideos(userId);
      const { videos } = data;

      return videos;
    } catch (error) {
      console.log(error);
    }
  }
);

const uploadUserVideo = createAsyncThunk(
  "video/postUserVideo",
  async uploadInfo => {
    const { userId, video } = uploadInfo;

    try {
      const { data } = await api.postUserVideo(userId, video);
      const { result } = data;

      if (result === "ok") {
        const { data } = await api.getUserVideos(userId);
        const { videos } = data;

        return videos;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const deleteUserVideo = createAsyncThunk(
  "video/deleteUserVideo",
  async (deleteInfo, thunkAPI) => {
    const { userId, videoId } = deleteInfo;

    const { data } = await api.deleteUserVideo(userId, videoId);
    const { result } = data;

    if (result === "ok") {
      const { video } = thunkAPI.getState();

      const remainVideos = video.videosByDate.filter(
        video => video._id !== videoId
      );

      return remainVideos;
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    updateCurrentVideo: (state, action) => {
      state.currentVideo = action.payload.video;

      return state;
    },
    updateRecorder: (state, action) => {
      state.recorder = action.payload;

      return state;
    },
  },
  extraReducers: {
    [fetchUserVideos.fulfilled]: (state, action) => {
      return {
        ...state,
        videosByDate: action.payload,
      };
    },
    [uploadUserVideo.fulfilled]: (state, action) => {
      return {
        ...state,
        recorder: initialState.recorder,
        videosByDate: action.payload,
      };
    },
    [deleteUserVideo.fulfilled]: (state, action) => {
      return {
        ...state,
        videosByDate: action.payload,
      };
    },
  },
});

export const videoActions = videoSlice.actions;
export const selectVideo = state => state.video;

export { fetchUserVideos, uploadUserVideo, deleteUserVideo };

export default videoSlice.reducer;
