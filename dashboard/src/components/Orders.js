import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders", { withCredentials: true });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="loading-text">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <h3>You haven't placed any orders yet.</h3>
        <p>Your executed orders will appear here.</p>
        <Link to="/" className="cta-button">
          Explore Markets
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2 className="page-title">Orders ({orders.length})</h2>
      <div className="orders-grid">
        {orders.map((order, idx) => (
          <div key={idx} className="order-card">
            <div className="order-header">
              <span className="stock-symbol">{order.name}</span>
              <span className={`mode-tag ${order.mode.toLowerCase()}`}>
                {order.mode}
              </span>
            </div>
            <div className="order-details">
              <p>
                <span>Quantity</span> <strong>{order.qty}</strong>
              </p>
              <p>
                <span>Avg. Price</span>{" "}
                <strong>₹{order.price.toFixed(2)}</strong>
              </p>
              <p>
                <span>Total Value</span>{" "}
                <strong>₹{(order.qty * order.price).toFixed(2)}</strong>
              </p>
            </div>
            <p className="timestamp">
              Executed on: {new Date(order.createdAt).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
