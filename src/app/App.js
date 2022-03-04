import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import theme from "../styles/theme";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import MainPage from "../components/pages/MainPage";
import LoginPage from "../components/pages/LoginPage";
import RecorderPage from "../components/pages/RecorderPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recorder" element={<RecorderPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
