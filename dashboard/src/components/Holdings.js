import React, { useState, useEffect, useContext } from "react";
import axios from "../utils/axiosInstance";
import { DoughnutChart } from "./DoughnoutChart";
import GeneralContext from "./GeneralContext";
import "./Holdings.css";

const Holdings = () => {
  const { openBuyWindow } = useContext(GeneralContext);
  const [allHoldings, setAllHoldings] = useState([]);
  const [livePrices, setLivePrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await axios.get("/api/holdings");
        setAllHoldings(res.data);

        const prices = {};
        for (let stock of res.data) {
          try {
            const priceRes = await axios.get(`/api/price/${stock.name}`);
            prices[stock.name] = parseFloat(priceRes.data.price) || 0;
          } catch (err) {
            prices[stock.name] = 0;
          }
        }
        setLivePrices(prices);
      } catch (err) {
        console.error("Error fetching holdings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHoldings();
  }, []);

  const getLTP = (symbol) => livePrices[symbol] || 0;

  const totalInvestment = allHoldings.reduce(
    (sum, s) => sum + s.avg * s.qty,
    0
  );
  const totalCurrentValue = allHoldings.reduce(
    (sum, s) => sum + getLTP(s.name) * s.qty,
    0
  );
  const totalPnl = totalCurrentValue - totalInvestment;

  const pieChartData = {
    labels: allHoldings.map((h) => h.name.replace(/\.NS|\.BO/, "")),
    datasets: [
      {
        data: allHoldings.map((h) => getLTP(h.name) * h.qty),
        backgroundColor: [
          "#3b82f6",
          "#16a34a",
          "#ef4444",
          "#f59e0b",
          "#6366f1",
          "#8b5cf6",
          "#ec4899",
          "#10b981",
        ],
        borderWidth: 0,
      },
    ],
  };

  if (loading) {
    return <p className="loading-text">Loading holdings...</p>;
  }

  return (
    <div className="holdings-container">
      <h2 className="page-title">Holdings ({allHoldings.length})</h2>

      {/* --- Main Table (Full Width) --- */}
      <div className="table-wrapper">
        <table className="holdings-table">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. Cost</th>
              <th>LTP</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.length > 0 ? (
              allHoldings.map((stock, index) => {
                const ltp = getLTP(stock.name);
                const pnl = (ltp - stock.avg) * stock.qty;
                const isProfit = pnl >= 0;

                return (
                  <tr
                    key={index}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}>
                    <td>
                      <div className="stock-info">
                        <span className="symbol">
                          {stock.name.replace(/\.NS|\.BO/, "")}
                        </span>
                        <span className="exchange-tag">
                          {stock.name.endsWith(".NS") ? "NSE" : "BSE"}
                        </span>
                      </div>
                    </td>
                    <td>{stock.qty}</td>
                    <td>₹{stock.avg.toFixed(2)}</td>
                    <td>₹{ltp.toFixed(2)}</td>
                    <td>
                      <div className="pnl-cell">
                        <span className={isProfit ? "profit" : "loss"}>
                          {pnl >= 0
                            ? `+₹${pnl.toFixed(2)}`
                            : `-₹${Math.abs(pnl).toFixed(2)}`}
                        </span>
                        {hoveredRow === index && (
                          <div className="trade-buttons">
                            <button
                              className="buy"
                              title="Buy"
                              onClick={() => openBuyWindow(stock.name, "BUY")}>
                              B
                            </button>
                            <button
                              className="sell"
                              title="Sell"
                              onClick={() => openBuyWindow(stock.name, "SELL")}>
                              S
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="no-holdings">
                  You do not have any holdings.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- Summary Section (Below Table) --- */}
      <div className="holdings-summary-section">
        <div className="summary-cards-grid">
          <div className="summary-card">
            <h4>₹{totalCurrentValue.toFixed(2)}</h4>
            <p>Current Value</p>
          </div>
          <div className="summary-card">
            <h4>₹{totalInvestment.toFixed(2)}</h4>
            <p>Total Investment</p>
          </div>
          <div className="summary-card">
            <h4 className={totalPnl >= 0 ? "profit" : "loss"}>
              {totalPnl >= 0 ? `+${totalPnl.toFixed(2)}` : totalPnl.toFixed(2)}
            </h4>
            <p>Total P&L</p>
          </div>
        </div>

        <div className="pie-chart-card">
          <h3 className="section-title">Allocation</h3>
          <div className="chart-canvas-container">
            <DoughnutChart data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holdings;
