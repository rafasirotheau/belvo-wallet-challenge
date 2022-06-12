import React from "react";
import { createRoot } from "react-dom/client";

const appRoot = createRoot(document.getElementById("app-root") as HTMLElement);

appRoot.render(
  <React.StrictMode>
    <div>base</div>
  </React.StrictMode>
);
