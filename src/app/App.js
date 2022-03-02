import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import theme from "../styles/theme";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import MainPage from "../components/MainPage";
import LoginPage from "../components/LoginPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
