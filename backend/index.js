require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { OrderModel } = require("./model/OrderModel");
const authRoutes = require("./routes/authRoutes");
const marketRoutes = require("./routes/marketRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// ✅ Allow cross-origin frontend/dashboard requests with cookies
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api", marketRoutes);

// ✅ Place a new order (per user)
app.post("/newOrder", authMiddleware, async (req, res) => {
  const { name, qty, price, mode } = req.body;
  const userId = req.user._id;

  if (!name || !qty || !price || !mode) {
    return res.status(400).json({ message: "Missing order fields" });
  }

  try {
    const newOrder = new OrderModel({
      userId,
      name,
      qty,
      price,
      mode,
      createdAt: new Date(),
    });
    await newOrder.save();
    return res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    console.error("Order Error:", err.message);
    return res.status(500).json({ message: "Order failed" });
  }
});

// ✅ Fetch orders for logged-in user
app.get("/api/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// ✅ Holdings = sum of BUY & SELL for logged-in user
app.get("/api/holdings", authMiddleware, async (req, res) => {
  const userId = req.user._id;

  try {
    const orders = await OrderModel.find({ userId });

    const holdingsMap = {};

    orders.forEach(({ name, qty, price, mode }) => {
      if (!holdingsMap[name]) {
        holdingsMap[name] = { qty: 0, totalCost: 0 };
      }

      if (mode === "BUY") {
        holdingsMap[name].qty += qty;
        holdingsMap[name].totalCost += qty * price;
      } else if (mode === "SELL") {
        holdingsMap[name].qty -= qty;
        holdingsMap[name].totalCost -= qty * price;
      }
    });

    const holdings = Object.entries(holdingsMap)
      .filter(([_, data]) => data.qty > 0)
      .map(([name, data]) => ({
        name,
        qty: data.qty,
        avg: data.totalCost / data.qty,
      }));

    res.json(holdings);
  } catch (err) {
    console.error("Holdings error:", err.message);
    res.status(500).json({ message: "Failed to calculate holdings" });
  }
});

// ✅ Positions = active buy/sell positions (qty !== 0)
app.get("/api/positions", authMiddleware, async (req, res) => {
  const userId = req.user._id;

  try {
    const orders = await OrderModel.find({ userId });

    const positionMap = {};

    orders.forEach(({ name, qty, price, mode }) => {
      if (!positionMap[name]) {
        positionMap[name] = { qty: 0, totalCost: 0 };
      }

      if (mode === "BUY") {
        positionMap[name].qty += qty;
        positionMap[name].totalCost += qty * price;
      } else if (mode === "SELL") {
        positionMap[name].qty -= qty;
        positionMap[name].totalCost -= qty * price;
      }
    });

    const positions = Object.entries(positionMap)
      .filter(([_, data]) => data.qty !== 0)
      .map(([name, data]) => ({
        name,
        qty: data.qty,
        avg: data.totalCost / data.qty,
        side: data.qty > 0 ? "Long" : "Short",
      }));

    res.json(positions);
  } catch (err) {
    console.error("Positions error:", err.message);
    res.status(500).json({ message: "Failed to fetch positions" });
  }
});

// ✅ Start server after DB connects
mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ DB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
