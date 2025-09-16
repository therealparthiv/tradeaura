import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Global Styles
import "./index.css";
import "./App.css";

// Layout & Page Components
import NavBar from "./landing_page/NavBar";
import Footer from "./landing_page/Footer";
import HomePage from "./landing_page/home/HomePage";
import AboutPage from "./landing_page/about/AboutPage";
import ProductsPage from "./landing_page/products/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import LearnPage from "./landing_page/learn/LearnPage"; // New Learn Page
import NotFound from "./landing_page/NotFound";

// Your working Login/Signup components
import Login from "./landing_page/signup/Login";
import Signup from "./landing_page/signup/Signup";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}>
        {/* NavBar is now always visible */}
        <NavBar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="*" element={<NotFound />} />

            {/* Your Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        {/* Footer is now always visible */}
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
