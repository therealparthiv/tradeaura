import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from "./utils/axiosInstance";

// Global Styles
import "./index.css";
import "./App.css";

// Layout & Public Page Components
import NavBar from "./landing_page/NavBar";
import Footer from "./landing_page/Footer";
import HomePage from "./landing_page/home/HomePage";
import AboutPage from "./landing_page/about/AboutPage";
import ProductsPage from "./landing_page/products/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import LearnPage from "./landing_page/learn/LearnPage";
import NotFound from "./landing_page/NotFound";

// Auth Components
import Login from "./landing_page/signup/Login";
import Signup from "./landing_page/signup/Signup";

// --- RESTORED DASHBOARD COMPONENTS ---
import { GeneralContextProvider } from "./dashboard_components/GeneralContext";
import Home from "./dashboard_components/Home";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/auth/profile");
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

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
        <NavBar />
        <main style={{ flex: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Dashboard Route */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <GeneralContextProvider>
                    <Home />
                  </GeneralContextProvider>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
