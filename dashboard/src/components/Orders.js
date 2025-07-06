import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import "./Orders.css"; // ✅ We'll define minimal modern styling here

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
    return <p className="fade-in text-center">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="empty-orders fade-in">
        <h3>No orders placed yet</h3>
        <Link to="/" className="cta">
          Place your first trade
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-page fade-in">
      <h2>Your Orders</h2>
      <div className="orders-grid">
        {orders.map((order, idx) => (
          <div key={idx} className="order-card">
            <div className="order-header">
              <span className="stock">{order.name}</span>
              <span className={`mode ${order.mode === "BUY" ? "buy" : "sell"}`}>
                {order.mode}
              </span>
            </div>

            <div className="order-details">
              <p>
                <strong>Qty:</strong> {order.qty}
              </p>
              <p>
                <strong>Price:</strong> ₹{order.price.toFixed(2)}
              </p>
              <p>
                <strong>Value:</strong> ₹{(order.qty * order.price).toFixed(2)}
              </p>
              <p className="timestamp">
                {new Date(order.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
