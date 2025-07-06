require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// ✅ CORS - allow frontend & dashboard apps
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

app.get("/allHoldings", async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// ✅ Start server after DB connects
mongoose
  .connect(uri)
  .then(() => {
    console.log("DB Started");
    app.listen(PORT, () => console.log(`App running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
