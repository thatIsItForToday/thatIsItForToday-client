import axios from "../config/axiosInstance";

const getUserVideos = async userId => {
  const response = await axios.get(`/users/${userId}/videos`);

  return response;
};

const postUserVideo = async (userId, videoInfo) => {
  const response = await axios.post(`/users/${userId}/video`, videoInfo);

  return response;
};

const deleteUserVideo = async (userId, videoId) => {
  const response = await axios.delete(`/users/${userId}/videos/${videoId}`);

  return response;
};

const getAutoLogin = async () => {
  const response = await axios.get("/auth/login", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return response;
};

const postNewAccessToken = async () => {
  const response = await axios.post(
    "/auth/token",
    {},
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    }
  );

  return response;
};

const putLogout = async userEmail => {
  const response = await axios.put("/auth/logout", {
    email: userEmail,
  });

  return response;
};

export {
  getUserVideos,
  postUserVideo,
  deleteUserVideo,
  getAutoLogin,
  postNewAccessToken,
  putLogout,
};
