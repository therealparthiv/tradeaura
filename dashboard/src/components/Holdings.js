import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [livePrices, setLivePrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await axios.get("/api/holdings");
        console.log("Holdings fetched:", res.data);
        setAllHoldings(res.data);

        // Fetch LTP for each
        const prices = {};
        for (let stock of res.data) {
          try {
            const priceRes = await axios.get(`/api/price/${stock.name}.NS`);
            prices[stock.name] = priceRes.data.price;
          } catch (err) {
            console.warn(`LTP fetch failed for ${stock.name}`);
            prices[stock.name] = 0;
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

  const getLTP = (symbol) => livePrices[symbol] || 0;

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

  if (loading) return <p>Loading Holdings...</p>;

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const ltp = getLTP(stock.name);
              const curValue = ltp * stock.qty;
              const invested = stock.avg * stock.qty;
              const pnl = curValue - invested;
              const isProfit = pnl >= 0;

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.avg.toFixed(2)}</td>
                  <td>₹{ltp.toFixed(2)}</td>
                  <td>₹{curValue.toFixed(2)}</td>
                  <td className={isProfit ? "profit" : "loss"}>
                    ₹{pnl.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row mt-4">
        <div className="col">
          <h5>₹{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>₹{totalCurrent.toFixed(2)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnl >= 0 ? "profit" : "loss"}>
            ₹{totalPnl.toFixed(2)} ({pnlPercent.toFixed(2)}%)
          </h5>
          <p>Total P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
