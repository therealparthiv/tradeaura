import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const LivePrice = ({ symbol }) => {
  const [priceData, setPriceData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await axios.get(`/api/price/${symbol}`);
        setPriceData(res.data);
      } catch (err) {
        setError("Failed to fetch price");
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 10000); // every 10 sec

    return () => clearInterval(interval);
  }, [symbol]);

  if (error) return <div className="live-price-card">{error}</div>;

  return priceData ? (
    <div className="live-price-card">
      <h5>{priceData.symbol}</h5>
      <p style={{ fontSize: "1.5rem", margin: "0.5rem 0" }}>
        ₹ {priceData.price}
      </p>
      <small>{priceData.timestamp}</small>
    </div>
  ) : (
    <div className="live-price-card">Loading...</div>
  );
};

export default LivePrice;
