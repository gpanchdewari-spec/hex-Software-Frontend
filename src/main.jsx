import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { UserAuthProvider } from "./context/UserAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserAuthProvider>
        <App />
      </UserAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
