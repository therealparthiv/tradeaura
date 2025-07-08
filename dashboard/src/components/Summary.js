import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import PortfolioPerformance from "./PortfolioPerformance";

import LivePrice from "./LivePrice";
import "./Summary.css";
const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await axios.get("/api/holdings");
        const data = res.data;
        setHoldings(data);

        const priceMap = {};
        for (let stock of data) {
          let symbol = stock.name;
          if (!symbol.endsWith(".NS") && !symbol.endsWith(".BO")) {
            symbol += ".NS"; // Default to NSE
          }

          try {
            const priceRes = await axios.get(`/api/price/${symbol}`);
            const price = parseFloat(priceRes.data.price);
            priceMap[stock.name] = isNaN(price) ? 0 : price;
          } catch (err) {
            console.warn("Failed to fetch price for", symbol);
            priceMap[stock.name] = 0;
          }
        }

        setPrices(priceMap);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching summary holdings:", err);
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  const getLTP = (symbol) => prices[symbol] || 0;

  const investment = holdings.reduce((acc, s) => acc + s.avg * s.qty, 0);
  const currentValue = holdings.reduce(
    (acc, s) => acc + getLTP(s.name) * s.qty,
    0
  );
  const pnl = currentValue - investment;
  const pnlPercent = investment > 0 ? (pnl / investment) * 100 : 0;

  return (
    <>
      {/* Username section */}
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      {/* Equity section */}
      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹0.00</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>₹0.00</span>
            </p>
            <p>
              Opening balance <span>₹0.00</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>
      <PortfolioPerformance
        history={[
          { time: "10 AM", value: 29450 },
          { time: "11 AM", value: 29620 },
          { time: "12 PM", value: 29850 },
          { time: "1 PM", value: 29720 },
          { time: "2 PM", value: 30100 },
          { time: "3 PM", value: 31000 },
        ]}
      />

      {/* Holdings section */}
      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              {pnl < 0 ? `-₹${Math.abs(pnl).toFixed(2)}` : `₹${pnl.toFixed(2)}`}
              <small>({pnlPercent.toFixed(2)}%)</small>
            </h3>

            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>₹{currentValue.toFixed(2)}</span>
            </p>
            <p>
              Investment <span>₹{investment.toFixed(2)}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>

      {/* 🔴 Live Price Section */}
      <div className="section">
        <span>
          <p>Live Market</p>
        </span>

        <div className="price-grid">
          <LivePrice symbol="RELIANCE.NS" />
          <LivePrice symbol="ITC.NS" />
          <LivePrice symbol="HDFCBANK.NS" />
          <LivePrice symbol="TCS.NS" />
        </div>

        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
