import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";

import Login from "@pages/auth/login";
import Register from "@pages/auth/register";
import ForgotPasswordPage from "@pages/auth/forgot-password";
import LandingPage from "@pages/landingPage";
import NotFound from "@pages/NotFound";
import ProtectedRoute from "@components/ProtectedRoute";
import Chat from "@pages/chat";

import Topbar from '@components/Topbar'

import { CssBaseline } from "@mui/material";

import Layout from "@components/Layout";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const AppRoutes = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/">
            <Route path="" element={<LandingPage />} />
            <Route path="auth/">
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
            </Route>
            <Route path="chat/" element={<ProtectedRoute isAllowed={true} />}>
              <Route path="" element={<Topbar />} />
              <Route
                path="discussion/"
                element={
                  <Layout>
                    <LandingPage />
                  </Layout>
                }
              />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default AppRoutes;
