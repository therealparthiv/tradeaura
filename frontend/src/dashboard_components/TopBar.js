// src/dashboard_components/TopBar.js

import React, { useContext } from "react";
import { GeneralContext } from "./GeneralContext";
import Search from "./Search";
import styles from "./TopBar.css"; // Use CSS Modules
import axios from "../utils/axiosInstance"; // Correct axios import path
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const { user } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      navigate("/login"); // Redirect to login on successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={styles.topbar}>
      {" "}
      {/* Use styles object */}
      <div className={styles.logo}>
        <img src="/media/images/logo.svg" alt="Logo" />
      </div>
      <Search />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{user ? user.name : "Guest"}</span>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
