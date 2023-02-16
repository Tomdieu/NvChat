"use client";
import "./globals.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";

const theme = createTheme();

export const runtime = "experimental-edge"; // 'nodejs' (default) | 'experimental-edge'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
