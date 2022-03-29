import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import theme from "../styles/theme";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import MainPage from "../components/pages/MainPage";
import LoginPage from "../components/pages/LoginPage";
import RecorderPage from "../components/pages/RecorderPage";
import VideoModal from "../components/VideoModal";
import MyVideosPage from "../components/pages/MyVideosPage";
import VideoDetailPage from "../components/pages/VideoDetailPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login/:token" element={<LoginPage />} />
        <Route path="/recorder" element={<RecorderPage />} />
        <Route
          path="/my-videos/:userId/detail/:videoId"
          element={<VideoDetailPage />}
        />
        <Route
          path="/my-videos/*"
          element={
            <>
              <MyVideosPage />
              <Outlet />
            </>
          }
        >
          <Route path=":userId/:videoId" element={<VideoModal />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
