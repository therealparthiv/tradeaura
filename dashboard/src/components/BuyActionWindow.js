import React, { useState, useEffect, useContext } from "react";
import axios from "../utils/axiosInstance";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css"; // Using the new, professional styles
import BoltIcon from "@mui/icons-material/Bolt"; // For a nice touch

const BuyActionWindow = ({ uid, mode }) => {
  const { closeBuyWindow } = useContext(GeneralContext);

  // State for all order parameters
  const [productType, setProductType] = useState("CNC"); // CNC or MIS
  const [orderType, setOrderType] = useState("LIMIT"); // LIMIT, MARKET, SL, SL-M
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0.0);
  const [triggerPrice, setTriggerPrice] = useState(0.0);
  const [stockData, setStockData] = useState({ price: 0, low: 0, high: 0 });

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await axios.get(`/api/price/${uid}`);
        if (res.data?.price) {
          const fetchedPrice = parseFloat(res.data.price);
          setStockData({
            price: fetchedPrice,
            low: res.data.dayLow || fetchedPrice * 0.98, // Mock if not available
            high: res.data.dayHigh || fetchedPrice * 1.02, // Mock if not available
          });
          setPrice(fetchedPrice);
        }
      } catch (err) {
        console.error("Price fetch error:", err);
      }
    };
    fetchPrice();
  }, [uid]);

  const handleSubmit = async () => {
    try {
      const orderDetails = {
        name: uid,
        qty: Number(quantity),
        price: Number(price),
        mode: mode,
        product: productType,
        orderType: orderType,
        triggerPrice: orderType.startsWith("SL")
          ? Number(triggerPrice)
          : undefined,
      };

      await axios.post("/newOrder", orderDetails);
      alert(
        `${mode} order for ${quantity} shares of ${uid} placed successfully!`
      );
      closeBuyWindow();
    } catch (err) {
      console.error("Order failed:", err?.response?.data || err);
      alert("Order failed. See console for details.");
    }
  };

  const isBuy = mode === "BUY";
  const marginRequired =
    (orderType === "MARKET" ? stockData.price : price) * quantity;

  return (
    <div
      className={`action-window-overlay ${isBuy ? "buy-theme" : "sell-theme"}`}>
      <div className="action-window" draggable="true">
        <div className="window-header">
          <div>
            <h3>
              {isBuy ? "Buy" : "Sell"} {uid.replace(".NS", "")}
            </h3>
            <span className="exchange">
              {uid.endsWith(".NS") ? "NSE" : "BSE"}
            </span>
          </div>
          <button className="close-btn" onClick={closeBuyWindow}>
            &times;
          </button>
        </div>

        <div className="window-body">
          <div className="segmented-control">
            <button
              className={productType === "CNC" ? "active" : ""}
              onClick={() => setProductType("CNC")}>
              Longterm <span className="label">CNC</span>
            </button>
            <button
              className={productType === "MIS" ? "active" : ""}
              onClick={() => setProductType("MIS")}>
              Intraday <span className="label">MIS</span>
            </button>
          </div>

          <div className="order-form">
            <div className="form-row">
              <div className="form-group">
                <label>Qty</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min={1}
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  step="0.05"
                  disabled={orderType === "MARKET"}
                />
              </div>
            </div>

            {orderType.startsWith("SL") && (
              <div className="form-row">
                <div className="form-group trigger-price">
                  <label>Trigger Price</label>
                  <input
                    type="number"
                    value={triggerPrice}
                    onChange={(e) => setTriggerPrice(e.target.value)}
                    step="0.05"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="order-type-selector">
            <h4>Order Type</h4>
            <div className="order-types">
              {["LIMIT", "MARKET", "SL", "SL-M"].map((type) => (
                <button
                  key={type}
                  className={orderType === type ? "active" : ""}
                  onClick={() => setOrderType(type)}>
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="window-footer">
          <div className="margin-info">
            <span className="label">Margin</span>
            <span className="value">≈ ₹{marginRequired.toFixed(2)}</span>
          </div>
          <button className="submit-btn" onClick={handleSubmit}>
            <BoltIcon style={{ fontSize: "1rem" }} />
            <span>{isBuy ? "Buy" : "Sell"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
