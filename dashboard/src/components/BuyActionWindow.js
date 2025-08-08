import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const { closeBuyWindow } = useContext(GeneralContext);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/price/${uid}`, {
          withCredentials: true,
        });
        if (res.data?.price) {
          setStockPrice(res.data.price);
        }
      } catch (err) {
        console.error("Price fetch error:", err);
      }
    };
    fetchPrice();
  }, [uid]);

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: mode || "BUY",
        },
        {
          withCredentials: true,
        }
      );
      alert(`${mode} order placed!`);
      closeBuyWindow();
    } catch (err) {
      console.error("Order failed:", err?.response?.data || err);
      alert("Order failed");
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              value={stockQuantity}
              min={1}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </fieldset>
        </div>
      </div>
      <div className="buttons">
        <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <button
            className={`btn ${mode === "BUY" ? "btn-blue" : "btn-red"}`}
            onClick={handleSubmit}>
            {mode === "BUY" ? "Buy" : "Sell"}
          </button>
          <button className="btn btn-grey" onClick={closeBuyWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
