import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { VerticalGraph } from "./VerticalGraph";
import "./Holdings.css";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [livePrices, setLivePrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await axios.get("/api/holdings");
        setAllHoldings(res.data);

        const prices = {};
        for (let stock of res.data) {
          const originalName = stock.name;
          let symbol = originalName;

          if (!symbol.endsWith(".NS") && !symbol.endsWith(".BO")) {
            symbol += ".NS";
          }

          try {
            const priceRes = await axios.get(`/api/price/${symbol}`);
            const fetchedPrice = parseFloat(priceRes.data.price);
            prices[originalName] = isNaN(fetchedPrice) ? 0 : fetchedPrice;
          } catch (err) {
            console.warn(`LTP fetch failed for ${symbol}`);
            prices[originalName] = 0;
          }
        }

        setLivePrices(prices);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching holdings or prices", err);
        setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  const getLTP = (symbol) => {
    const price = livePrices[symbol];
    return typeof price === "number" ? price : 0;
  };

  const formatExchange = (name) => {
    if (name.endsWith(".BO")) return "BSE";
    return "NSE";
  };

  const stripExtension = (name) => name.replace(/\.NS|\.BO/, "");

  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );

  const totalCurrent = allHoldings.reduce(
    (sum, stock) => sum + getLTP(stock.name) * stock.qty,
    0
  );

  const totalPnl = totalCurrent - totalInvestment;
  const pnlPercent = (totalPnl / totalInvestment) * 100;

  const data = {
    labels: allHoldings.map((s) => s.name),
    datasets: [
      {
        label: "LTP",
        data: allHoldings.map((stock) => getLTP(stock.name)),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  if (loading) return <p className="loading">Loading Holdings...</p>;

  return (
    <div className="holdings-container">
      <h3 className="title">Your Holdings ({allHoldings.length})</h3>

      <div className="holdings-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Avg Cost</th>
              <th>LTP</th>
              <th>% Gain</th>
              <th>Current Value</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const ltp = getLTP(stock.name);
              const curValue = ltp * stock.qty;
              const invested = stock.avg * stock.qty;
              const pnl = curValue - invested;
              const percentGain = ((ltp - stock.avg) / stock.avg) * 100;

              const isProfit = pnl > 0;
              const isLoss = pnl < 0;

              return (
                <tr key={index}>
                  <td>
                    <div className="stock-info">
                      <span className="symbol">
                        {stripExtension(stock.name)}
                      </span>
                      <span className="exchange-tag">
                        {formatExchange(stock.name)}
                      </span>
                      <span className="cnc-tag">CNC</span>
                    </div>
                  </td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.avg.toFixed(2)}</td>
                  <td>₹{ltp.toFixed(2)}</td>
                  <td className={percentGain >= 0 ? "profit" : "loss"}>
                    {percentGain.toFixed(2)}%
                  </td>
                  <td>₹{curValue.toFixed(2)}</td>
                  <td className={isProfit ? "profit" : isLoss ? "loss" : ""}>
                    {isLoss
                      ? `-₹${Math.abs(pnl).toFixed(2)}`
                      : `₹${pnl.toFixed(2)}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="summary">
        <div>
          <h4>₹{totalInvestment.toFixed(2)}</h4>
          <p>Invested</p>
        </div>
        <div>
          <h4>₹{totalCurrent.toFixed(2)}</h4>
          <p>Current Value</p>
        </div>
        <div>
          <h4>
            <span className={totalPnl < 0 ? "loss" : "profit"}>
              {totalPnl < 0
                ? `-₹${Math.abs(totalPnl).toFixed(2)}`
                : `₹${totalPnl.toFixed(2)}`}
            </span>
            &nbsp;
            <span className={totalPnl < 0 ? "loss" : "profit"}>
              ({pnlPercent.toFixed(2)}%)
            </span>
          </h4>

          <p>Total P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </div>
  );
};

export default Holdings;
