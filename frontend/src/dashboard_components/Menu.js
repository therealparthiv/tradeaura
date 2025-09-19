// src/dashboard_components/Menu.js

import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Menu.css"; // Use CSS Modules

const Menu = () => {
  return (
    <div className={styles.menu}>
      {" "}
      {/* Use styles object */}
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? styles.active : "")}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/orders"
            className={({ isActive }) => (isActive ? styles.active : "")}>
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/holdings"
            className={({ isActive }) => (isActive ? styles.active : "")}>
            Holdings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/positions"
            className={({ isActive }) => (isActive ? styles.active : "")}>
            Positions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/funds"
            className={({ isActive }) => (isActive ? styles.active : "")}>
            Funds
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/apps"
            className={({ isActive }) => (isActive ? styles.active : "")}>
            Apps
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
