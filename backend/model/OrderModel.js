const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  mode: { type: String, enum: ["BUY", "SELL"], required: true },

  // --- NEW FIELDS ---
  product: { type: String, enum: ["CNC", "MIS"], default: "CNC" },
  orderType: { type: String, default: "LIMIT" },
  triggerPrice: { type: Number },

  createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model("orders", OrderSchema);

module.exports = { OrderModel };
