const express = require("express");
const yahooFinance = require("yahoo-finance2").default; // We will use this for everything
const router = express.Router();

// 🚀 UPDATED Price Route: Directly fetches from yahoo-finance2
router.get("/price/:symbol", async (req, res) => {
  const { symbol } = req.params;
  try {
    // Use the robust yahooFinance.quote method
    const result = await yahooFinance.quote(symbol);

    if (!result || !result.regularMarketPrice) {
      console.warn(`No price data found for symbol: ${symbol}`);
      return res.status(404).json({ error: "No price data found for symbol" });
    }

    // This returns a complete object that your frontend is designed to use
    res.json({
      symbol: result.symbol,
      price: result.regularMarketPrice,
      change: result.regularMarketChange,
      pChange: result.regularMarketChangePercent,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error(`Market data error for ${symbol}:`, err.message);
    // If a stock truly doesn't exist, this will correctly send a 404/500 error
    res
      .status(err.code === 404 ? 404 : 500)
      .json({ error: "Failed to fetch live price" });
  }
});

// Your working search route
router.get("/search-stocks", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "A search query 'q' is required." });
  }
  try {
    const searchResults = await yahooFinance.search(q, {
      quotesCount: 10,
      newsCount: 0,
    });
    const formattedResults = searchResults.quotes
      .filter((quote) => quote.longname)
      .map((quote) => ({
        symbol: quote.symbol,
        name: quote.longname,
      }));
    res.json(formattedResults);
  } catch (error) {
    console.error("Stock search error:", error);
    res
      .status(500)
      .json({ error: "An error occurred during the stock search." });
  }
});

module.exports = router;
