import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { VerticalGraph } from "./VerticalGraph";

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
          const priceRes = await axios.get(`/api/price/${pos.name}.NS`);
          prices[pos.name] = priceRes.data.price;
        }

        setLivePrices(prices);
        setLoading(false);
      } catch (err) {
        console.error("Error loading positions", err);
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const getLTP = (symbol) => livePrices[symbol] || 0;

  const labels = positions.map((s) => s.name);
  const data = {
    labels,
    datasets: [
      {
        label: "LTP",
        data: positions.map((s) => getLTP(s.name)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  if (loading) return <p>Loading positions...</p>;

  return (
    <>
      <h3 className="title">Open Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Side</th>
              <th>Qty</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos, index) => {
              const ltp = getLTP(pos.name);
              const curValue = ltp * pos.qty;
              const invested = pos.avg * pos.qty;
              const pnl = curValue - invested;
              const isProfit = pnl >= 0;

              return (
                <tr key={index}>
                  <td>{pos.name}</td>
                  <td>{pos.side}</td>
                  <td>{pos.qty}</td>
                  <td>{pos.avg.toFixed(2)}</td>
                  <td>{ltp.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={isProfit ? "profit" : "loss"}>
                    {pnl.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Positions;
