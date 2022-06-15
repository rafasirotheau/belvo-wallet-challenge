import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import appTheme from "./layouts/app-theme";
import "css-baseline/css/4.css";
import "./styles/main.scss";

const appRoot = createRoot(document.getElementById("app-root") as HTMLElement);

appRoot.render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
