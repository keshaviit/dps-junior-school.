import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#264E52",
            color: "#ffffff",
            fontSize: "0.9rem",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
          }
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);

