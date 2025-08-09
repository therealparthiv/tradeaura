require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import all necessary models and routes
const { OrderModel } = require("./model/OrderModel");
const authRoutes = require("./routes/authRoutes");
const marketRoutes = require("./routes/marketRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// --- Middleware Setup ---
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api", marketRoutes);
app.use("/api/watchlist", watchlistRoutes);

// Get User Details for TopBar
app.get("/api/user-details", authMiddleware, (req, res) => {
  if (req.user) {
    res.json({
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// --- Core Trading Endpoints ---

// ✅ Create a new, detailed order
app.post("/newOrder", authMiddleware, async (req, res) => {
  const { name, qty, price, mode, product, orderType, triggerPrice } = req.body;
  const userId = req.user._id;
  if (!name || !qty || !price || !mode || !product || !orderType) {
    return res
      .status(400)
      .json({ message: "Incomplete order details provided" });
  }
  try {
    const newOrder = new OrderModel({
      userId,
      name,
      qty,
      price,
      mode,
      product,
      orderType,
      triggerPrice,
    });
    await newOrder.save();
    return res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Order failed to execute" });
  }
});

// ✅ Fetch all orders for the logged-in user
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

// ✅ Calculate CNC (Long-term) holdings
app.get("/api/holdings", authMiddleware, async (req, res) => {
  const userId = req.user._id;
  try {
    const orders = await OrderModel.find({
      userId,
      $or: [{ product: "CNC" }, { product: { $exists: false } }],
    });
    const holdingsMap = {};
    orders.forEach(({ name, qty, price, mode }) => {
      if (!holdingsMap[name]) holdingsMap[name] = { qty: 0, totalCost: 0 };
      if (mode === "BUY") {
        holdingsMap[name].qty += qty;
        holdingsMap[name].totalCost += qty * price;
      } else if (mode === "SELL") {
        const avgCost =
          holdingsMap[name].qty > 0
            ? holdingsMap[name].totalCost / holdingsMap[name].qty
            : 0;
        holdingsMap[name].totalCost -= qty * avgCost;
        holdingsMap[name].qty -= qty;
      }
    });
    const holdings = Object.entries(holdingsMap)
      .filter(([_, data]) => data.qty > 1e-9)
      .map(([name, data]) => ({
        name,
        qty: data.qty,
        avg: data.qty > 0 ? data.totalCost / data.qty : 0,
      }));
    res.json(holdings);
  } catch (err) {
    res.status(500).json({ message: "Failed to calculate holdings" });
  }
});

// ✅ Calculate MIS (Intraday) positions
app.get("/api/positions", authMiddleware, async (req, res) => {
  const userId = req.user._id;
  try {
    const orders = await OrderModel.find({ userId, product: "MIS" });
    const positionMap = {};
    orders.forEach(({ name, qty, price, mode }) => {
      if (!positionMap[name])
        positionMap[name] = { qty: 0, totalValue: 0, trades: 0 };
      const multiplier = mode === "BUY" ? 1 : -1;
      positionMap[name].qty += qty * multiplier;
      positionMap[name].totalValue += qty * price * multiplier;
      positionMap[name].trades++;
    });
    const positions = Object.entries(positionMap)
      .filter(([_, data]) => Math.abs(data.qty) > 1e-9)
      .map(([name, data]) => ({
        name,
        qty: data.qty,
        avg: data.trades > 0 ? Math.abs(data.totalValue / data.qty) : 0,
        side: data.qty > 0 ? "Long" : "Short",
      }));
    res.json(positions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch positions" });
  }
});

// ✅ ACCURATE Portfolio History from Your Actual Orders
app.get("/api/portfolio-history", authMiddleware, async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.user._id }).sort({
      createdAt: "asc",
    });
    if (orders.length === 0) {
      return res.json([{ time: "Start", value: 0 }]);
    }
    const portfolio = new Map();
    const history = [{ time: "Start", value: 0 }];
    for (const order of orders) {
      const stock = portfolio.get(order.name) || { qty: 0 };
      if (order.mode === "BUY") stock.qty += order.qty;
      else stock.qty -= order.qty;
      portfolio.set(order.name, stock);
      let cumulativeValue = 0;
      for (const [symbol, data] of portfolio.entries()) {
        const latestOrderForSymbol = orders
          .filter((o) => o.name === symbol && o.createdAt <= order.createdAt)
          .pop();
        const lastKnownPrice = latestOrderForSymbol
          ? latestOrderForSymbol.price
          : 0;
        cumulativeValue += data.qty * lastKnownPrice;
      }
      history.push({
        time: new Date(order.createdAt).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
        }),
        value: Math.round(cumulativeValue),
      });
    }
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Failed to generate portfolio history" });
  }
});

// --- Database Connection & Server Start ---
mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ DB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
