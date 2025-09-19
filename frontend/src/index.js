import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// Correct the import statement to use a named import
import { jwtDecode } from "jwt-decode";

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
import SupportPage from "./landing_page/support/SupportPage";
import Login from "./landing_page/signup/Login";
import Signup from "./landing_page/signup/Signup";
import NotFound from "./landing_page/NotFound";

// Dashboard Components
import Dashboard from "./dashboard_components/Dashboard";
import { GeneralContextProvider } from "./dashboard_components/GeneralContext";

const App = () => {
  const checkAuth = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="));
    if (!token) return false;

    try {
      // Change the function call to match the new import
      const decodedToken = jwtDecode(token.split("=")[1]);
      // Check if token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };
  const isAuthenticated = checkAuth();

  return (
    <BrowserRouter>
      <GeneralContextProvider>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <NavBar />
                <Routes>
                  <Route index element={<HomePage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="pricing" element={<PricingPage />} />
                  <Route path="support" element={<SupportPage />} />
                  <Route
                    path="login"
                    element={
                      isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
                    }
                  />
                  <Route
                    path="signup"
                    element={
                      isAuthenticated ? (
                        <Navigate to="/dashboard" />
                      ) : (
                        <Signup />
                      )
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </>
            }
          />

          <Route
            path="/dashboard/*"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </GeneralContextProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
