const mongoose = require("mongoose");

const watchListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stocks: [
    {
      symbol: { type: String, required: true },
      addedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Watchlist", watchListSchema);
