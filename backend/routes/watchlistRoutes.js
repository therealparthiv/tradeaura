const express = require("express");
const {
  getWatchlist,
  addStock,
  removeStock,
} = require("../controllers/watchlistController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getWatchlist);
router.post("/", authMiddleware, addStock);
router.delete("/:symbol", authMiddleware, removeStock);

module.exports = router;
