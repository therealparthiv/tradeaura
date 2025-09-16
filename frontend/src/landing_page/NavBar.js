import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src="/media/images/growwLogo.svg"
          alt="TradeAura Logo"
          className="navbar-logo"
        />
      </Link>
      <div className="navbar-links">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }>
          Products
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }>
          About Us
        </NavLink>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }>
          Pricing
        </NavLink>
        <NavLink
          to="/learn"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }>
          Learn
        </NavLink>
      </div>
      <Link to="/login" className="btn">
        Login / Register
      </Link>
    </nav>
  );
}

export default NavBar;
