import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import PortfolioPerformance from "./PortfolioPerformance";
import "./Summary.css";

const IndexCard = ({ data }) => {
  if (!data) return <div className="index-card loading"></div>;
  const isProfit = data.change >= 0;
  return (
    <div className="index-card">
      <h4 className="index-card-name">{data.name}</h4>
      <p className={`index-card-price ${isProfit ? "profit" : "loss"}`}>
        {data.price.toFixed(2)}
      </p>
      <p className={`index-card-change ${isProfit ? "profit" : "loss"}`}>
        {isProfit ? "+" : ""}
        {data.change.toFixed(2)} ({data.pChange.toFixed(2)}%)
      </p>
    </div>
  );
};

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [prices, setPrices] = useState({});
  const [portfolioHistory, setPortfolioHistory] = useState([]);
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [holdingsRes, historyRes, indicesRes] = await Promise.all([
          axios.get("/api/holdings"),
          axios.get("/api/portfolio-history"),
          axios.get("/api/indices"),
        ]);

        setHoldings(holdingsRes.data);
        setPortfolioHistory(historyRes.data);
        setIndices(indicesRes.data);

        const priceMap = {};
        for (let stock of holdingsRes.data) {
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

  return (
    <div className="summary-page">
      <div className="summary-header">
        <h1>Dashboard</h1>
      </div>

      <PortfolioPerformance
        holdings={holdings}
        prices={prices}
        history={portfolioHistory}
        loading={loading}
      />

      <div className="market-watch-section">
        <h3>Market Watch</h3>
        <div className="indices-grid">
          {loading
            ? [...Array(4)].map((_, i) => <IndexCard key={i} />)
            : indices.map((index) => (
                <IndexCard key={index.name} data={index} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;
