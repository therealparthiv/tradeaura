import React from "react";
import Menu from "./Menu";
import "./TopBar.css";

const TopBar = () => {
  return (
    <header className="topbar-container">
      <div className="topbar-brand">
        <img src="/logo.jpeg" alt="logo" className="logo" />
        <span className="brand-name">TradeAura</span>
      </div>

      <div className="topbar-indices">
        <div className="index-item">
          <p className="index-name">NIFTY 50</p>
          <p className="index-points loss">17,546.15</p>
          <p className="index-change loss">(-0.25%)</p>
        </div>
        <div className="index-item">
          <p className="index-name">SENSEX</p>
          <p className="index-points profit">58,833.87</p>
          <p className="index-change profit">(+0.50%)</p>
        </div>
      </div>

      <div className="topbar-menu">
        <Menu />
      </div>
    </header>
  );
};

export default TopBar;
