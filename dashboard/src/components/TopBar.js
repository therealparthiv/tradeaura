import React, { useState, useEffect, useContext } from "react";
import axios from "../utils/axiosInstance";
import { Link, useLocation } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GeneralContext from "./GeneralContext";
import "./TopBar.css";

const IndexTicker = ({ data }) => {
  if (!data) return <div className="index-item loading-placeholder"></div>;
  const isProfit = data.change >= 0;
  return (
    <div className="index-item">
      <p className="index-name">{data.name}</p>
      <p className={`index-points ${isProfit ? "profit" : "loss"}`}>
        {data.price.toFixed(2)}
      </p>
      <p className={`index-change ${isProfit ? "profit" : "loss"}`}>
        ({data.pChange.toFixed(2)}%)
      </p>
    </div>
  );
};

const TopBar = ({ toggleTheme, theme }) => {
  const location = useLocation();
  const { authStatus } = useContext(GeneralContext);
  const [indices, setIndices] = useState(null);
  const [user, setUser] = useState({ name: "", initials: "" });
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const menuItems = [
    { to: "/", label: "Dashboard" },
    { to: "/orders", label: "Orders" },
    { to: "/holdings", label: "Holdings" },
    { to: "/positions", label: "Positions" },
    { to: "/funds", label: "Funds" },
    { to: "/apps", label: "Apps" },
  ];

  useEffect(() => {
    if (authStatus === "LOGGED_IN") {
      const fetchData = async () => {
        try {
          const [indicesRes, userRes] = await Promise.all([
            axios.get("/api/indices"),
            axios.get("/api/user-details"),
          ]);
          setIndices(indicesRes.data);
          const email = userRes.data.email || "";
          const name = email.split("@")[0];
          const initials = (name.substring(0, 2) || "ZU").toUpperCase();
          setUser({ name, initials });
        } catch (error) {
          console.error("Failed to fetch top bar data:", error);
        }
      };
      fetchData();
    }
  }, [authStatus]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.href = "http://localhost:3000/login";
    } catch (err) {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <header className="topbar-container">
      <div className="topbar-brand">
        <img src="/logo.jpeg" alt="logo" className="logo" />
      </div>
      <div className="topbar-indices">
        <IndexTicker data={indices ? indices[0] : null} />
        <IndexTicker data={indices ? indices[1] : null} />
      </div>
      <nav className="topbar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`menu-link ${
              location.pathname === item.to ? "active" : ""
            }`}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="topbar-right-section">
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          title="Toggle Theme">
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </button>
        <div className="profile-container">
          <div
            className="profile"
            onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <div className="avatar">{user.initials}</div>
            <p className="username">{user.name}</p>
          </div>
          {isDropdownOpen && (
            <div className="profile-dropdown">
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
