import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";

const theme = responsiveFontSizes(createTheme());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
