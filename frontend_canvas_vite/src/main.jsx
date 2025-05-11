import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GameProvider } from "./gameContext";

import "bootstrap/dist/css/bootstrap.css";

// import './index.css'

import refreshRuntime from "react-refresh/runtime";

// Enable React Refresh
refreshRuntime.injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <GameProvider> */}
      <App />
    {/* </GameProvider>, */}
  </React.StrictMode>
);
