import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const menuItems = [
    { to: "/", label: "Dashboard" },
    { to: "/orders", label: "Orders" },
    { to: "/holdings", label: "Holdings" },
    { to: "/positions", label: "Positions" },
    { to: "/funds", label: "Funds" },
    { to: "/apps", label: "Apps" },
  ];

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    alert("Logout clicked!");
  };

  return (
    <nav className="menu-container">
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={`menu-link ${
                location.pathname === item.to ? "active" : ""
              }`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="profile-container">
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>
        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Menu;
