const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Add this
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  mode: { type: String, enum: ["BUY", "SELL"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model("orders", OrderSchema);

module.exports = { OrderModel };
