const { Router } = require("express");
const watchlistController = require("../controllers/watchlistController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = Router();

// All watchlist routes are protected
router.use(requireAuth);

// GET request to fetch the entire watchlist
router.get("/", watchlistController.get_watchlist);

// POST request to add a new stock to the watchlist
router.post("/", watchlistController.add_to_watchlist);

// DELETE request to remove a stock from the watchlist
router.delete("/:uid", watchlistController.remove_from_watchlist);

module.exports = router;
