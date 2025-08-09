import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import PortfolioPerformance from "./PortfolioPerformance";
import LivePrice from "./LivePrice";
import "./Summary.css";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [prices, setPrices] = useState({});
  const [portfolioHistory, setPortfolioHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [holdingsRes, historyRes] = await Promise.all([
          axios.get("/api/holdings"),
          axios.get("/api/portfolio-history"),
        ]);

        const holdingsData = holdingsRes.data;
        setHoldings(holdingsData);
        setPortfolioHistory(historyRes.data);

        const priceMap = {};
        for (let stock of holdingsData) {
          try {
            const priceRes = await axios.get(`/api/price/${stock.name}`);
            priceMap[stock.name] = parseFloat(priceRes.data.price) || 0;
          } catch (err) {
            priceMap[stock.name] = 0;
          }
        }
        setPrices(priceMap);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getLTP = (symbol) => prices[symbol] || 0;

  const investment = holdings.reduce((acc, s) => acc + s.avg * s.qty, 0);
  const currentValue = holdings.reduce(
    (acc, s) => acc + getLTP(s.name) * s.qty,
    0
  );
  const pnl = currentValue - investment;

  return (
    <div className="summary-page">
      <div className="summary-header">
        <h1>Dashboard</h1>
        <p>Welcome back, here's a snapshot of your portfolio.</p>
      </div>

      <div className="summary-main-card">
        <div className="performance-section">
          <h3 className="section-title">Performance</h3>
          {/* This component will now render correctly inside its container */}
          <PortfolioPerformance history={portfolioHistory} loading={loading} />
        </div>
        <div className="overview-section">
          <h3 className="section-title">Portfolio Overview</h3>
          <div className="overview-metric">
            <span className="metric-label">Total Investment</span>
            <span className="metric-value">₹{investment.toFixed(2)}</span>
          </div>
          <div className="overview-metric">
            <span className="metric-label">Current Value</span>
            <span className="metric-value">₹{currentValue.toFixed(2)}</span>
          </div>
          <div className="overview-metric">
            <span className="metric-label">Total P&L</span>
            <span className={`metric-value ${pnl >= 0 ? "profit" : "loss"}`}>
              {pnl >= 0
                ? `+₹${pnl.toFixed(2)}`
                : `-₹${Math.abs(pnl).toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>

      <div className="market-watch-section">
        <h3>Market Watch</h3>
        <div className="price-grid">
          <LivePrice symbol="RELIANCE.NS" />
          <LivePrice symbol="TCS.NS" />
          <LivePrice symbol="HDFCBANK.NS" />
          <LivePrice symbol="ITC.NS" />
        </div>
      </div>
    </div>
  );
};

export default Summary;
