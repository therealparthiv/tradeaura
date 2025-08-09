import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GeneralContextProvider } from "./components/GeneralContext";
import App from "./components/App"; // Corrected: Import App instead of Home
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GeneralContextProvider>
        {/*
          This is the key change. We are now rendering the App component,
          which will handle the theme switching logic.
        */}
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </GeneralContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
