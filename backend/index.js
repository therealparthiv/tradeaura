const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const marketRoutes = require("./routes/marketRoutes");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//database connection
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then(() => app.listen(process.env.PORT || 4000))
  .catch((err) => console.log(err));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/market", marketRoutes);
