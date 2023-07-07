import React from "react";
import ReactDOM from "react-dom/client";

import { Router } from "@/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./contexts/user";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
        <UserProvider>
          <Router />
          <ToastContainer />
        </UserProvider>
      </BrowserRouter>
  </React.StrictMode>
);
