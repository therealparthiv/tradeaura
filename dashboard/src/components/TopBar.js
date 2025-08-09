import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import Menu from "./Menu";
import "./TopBar.css";

const IndexTicker = ({ data }) => {
  if (!data) return null;
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

const TopBar = () => {
  const [indices, setIndices] = useState(null);

  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const res = await axios.get("/api/indices");
        setIndices(res.data);
      } catch (error) {
        console.error("Failed to fetch indices for TopBar:", error);
      }
    };
    fetchIndices();
    const interval = setInterval(fetchIndices, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="topbar-container">
      <div className="topbar-brand">
        <img src="/logo.jpeg" alt="logo" className="logo" />
        <span className="brand-name">TradeAura</span>
      </div>

      <div className="topbar-indices">
        {indices ? (
          <>
            <IndexTicker data={indices[0]} /> {/* NIFTY */}
            <IndexTicker data={indices[1]} /> {/* SENSEX */}
          </>
        ) : (
          <p className="loading-indices">Loading Indices...</p>
        )}
      </div>

      <div className="topbar-menu">
        <Menu />
      </div>
    </header>
  );
};

export default TopBar;
