import React from "react";
import { Route, Routes } from "react-router-dom";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";

import Login from "@pages/auth/login";
import Register from "@pages/auth/register";
import ForgotPasswordPage from "@pages/auth/forgot-password";
import LandingPage from "@pages/landingPage";
import NotFound from "pages/NotFound";
import ProtectedRoute from "@components/ProtectedRoute";
import ChatRoutes from "./ChatRoutes";

import { CssBaseline } from "@mui/material";

// import Layout from "@layouts/container"

let theme = createTheme();
theme = responsiveFontSizes(theme);

const AppRoutes = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <Routes>
          <Route path="/">
            <Route path="" element={<LandingPage />} />
            <Route path="auth/">
              <Route path="" element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
            </Route>
            <Route path="app/">
              <Route path="chat/*" element={<ChatRoutes />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </>
    </ThemeProvider>
  );
};

export default AppRoutes;
