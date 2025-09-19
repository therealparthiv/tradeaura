import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import "./Positions.css"; // Using the new, improved styles

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [livePrices, setLivePrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await axios.get("/api/positions");
        setPositions(res.data);

        const prices = {};
        for (let pos of res.data) {
          try {
            const priceRes = await axios.get(`/api/price/${pos.name}`);
            prices[pos.name] = parseFloat(priceRes.data.price) || 0;
          } catch (err) {
            console.warn(`Price fetch failed for ${pos.name}`);
            prices[pos.name] = 0;
          }
        }
        setLivePrices(prices);
      } catch (err) {
        console.error("Error loading positions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const getLTP = (symbol) => livePrices[symbol] || 0;
  const getExchange = (name) => (name.endsWith(".BO") ? "BSE" : "NSE");
  const stripExtension = (name) => name.replace(/\.NS|\.BO/, "");

  if (loading) {
    return <p className="loading-text">Loading positions...</p>;
  }

  const totalPNL = positions.reduce((acc, pos) => {
    const ltp = getLTP(pos.name);
    const invested = pos.avg * Math.abs(pos.qty);
    const curValue = ltp * Math.abs(pos.qty);
    return acc + (curValue - invested);
  }, 0);

  return (
    <div className="positions-container">
      <div className="positions-header">
        <h2 className="page-title">Positions ({positions.length})</h2>
        <div className="pnl-summary">
          <span className="pnl-label">Total P&L</span>
          <span className={`pnl-value ${totalPNL >= 0 ? "profit" : "loss"}`}>
            {totalPNL >= 0
              ? `+₹${totalPNL.toFixed(2)}`
              : `-₹${Math.abs(totalPNL).toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="positions-table">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Product</th>
              <th>Side</th>
              <th>Qty.</th>
              <th>Avg. Cost</th>
              <th>LTP</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {positions.length > 0 ? (
              positions.map((pos, index) => {
                const ltp = getLTP(pos.name);
                const invested = pos.avg * Math.abs(pos.qty);
                const curValue = ltp * Math.abs(pos.qty);
                const pnl = curValue - invested;
                const isProfit = pnl >= 0;

                return (
                  <tr key={index}>
                    <td>
                      <div className="stock-info">
                        <span className="symbol">
                          {stripExtension(pos.name)}
                        </span>
                        <span className="exchange-tag">
                          {getExchange(pos.name)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="product-tag">MIS</span>
                    </td>
                    <td>
                      <span className={`side-tag ${pos.side.toLowerCase()}`}>
                        {pos.side}
                      </span>
                    </td>
                    <td className="quantity">{pos.qty}</td>
                    <td>₹{pos.avg.toFixed(2)}</td>
                    <td>₹{ltp.toFixed(2)}</td>
                    <td className={isProfit ? "profit" : "loss"}>
                      {pnl.toFixed(2)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="no-positions">
                  You have no open intraday positions.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions;
