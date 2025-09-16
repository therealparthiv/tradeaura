import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-column">
          <img
            src="/media/images/growwLogo.svg"
            alt="TradeAura Logo"
            style={{ height: "30px", marginBottom: "1rem" }}
          />
          <p>Groww</p>
          <p>Kochi, Kerala, India</p>
        </div>
        <div className="footer-column">
          <h4>Products</h4>
          <Link to="/products">Stocks</Link>
          <Link to="/products">Futures & Options</Link>
          <Link to="/products">Mutual Funds</Link>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/learn">Learn (Blog)</Link>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <Link to="#">FAQs</Link>
          <Link to="#">Contact Us</Link>
          <Link to="/login">Open an Account</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 TradeAura. All rights reserved. Built by Parthiv.</p>
      </div>
    </footer>
  );
}
export default Footer;
