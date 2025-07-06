const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/price/:symbol", async (req, res) => {
  const { symbol } = req.params;
  try {
    const response = await axios.get(`http://localhost:5001/price/${symbol}`);
    res.json(response.data);
  } catch (err) {
    console.error("Market data error:", err.message);
    res.status(500).json({ error: "Failed to fetch live price" });
  }
});

module.exports = router;
