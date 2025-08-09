const express = require("express");
const yahooFinance = require("yahoo-finance2").default;
const router = express.Router();

const queryOptions = { validateResult: false };

// --- Price Route ---
router.get("/price/:symbol", async (req, res) => {
  const { symbol } = req.params;
  try {
    const result = await yahooFinance.quote(symbol, {}, queryOptions);
    if (!result || !result.regularMarketPrice) {
      return res.status(404).json({ error: "No price data found for symbol" });
    }
    res.json({
      symbol: result.symbol,
      price: result.regularMarketPrice,
      change: result.regularMarketChange,
      pChange: result.regularMarketChangePercent,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch live price" });
  }
});

// --- Search Route ---
router.get("/search-stocks", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "A search query 'q' is required." });
  }
  try {
    const searchResults = await yahooFinance.search(
      q,
      { quotesCount: 10, newsCount: 0 },
      queryOptions
    );
    const formattedResults = searchResults.quotes
      .filter((quote) => quote.longname)
      .map((quote) => ({ symbol: quote.symbol, name: quote.longname }));
    res.json(formattedResults);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred during the stock search." });
  }
});

// --- Historical Data Route ---
router.get("/history/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const { range = "1mo", interval = "1d" } = req.query;
  const today = new Date();
  let startDate;
  switch (range) {
    case "1d":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 1);
      break;
    case "5d":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 5);
      break;
    case "1mo":
      startDate = new Date(today);
      startDate.setMonth(today.getMonth() - 1);
      break;
    case "6mo":
      startDate = new Date(today);
      startDate.setMonth(today.getMonth() - 6);
      break;
    case "1y":
      startDate = new Date(today);
      startDate.setFullYear(today.getFullYear() - 1);
      break;
    case "5y":
      startDate = new Date(today);
      startDate.setFullYear(today.getFullYear() - 5);
      break;
    default:
      startDate = new Date(0);
  }
  try {
    const result = await yahooFinance.chart(
      symbol,
      { period1: startDate, interval: interval },
      queryOptions
    );
    const history = result.quotes.map((quote) => ({
      time: new Date(quote.date).getTime(),
      value: quote.close,
    }));
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch historical data." });
  }
});

// --- Market Indices Route ---
router.get("/indices", async (req, res) => {
  try {
    const symbols = ["^NSEI", "^BSESN", "^CNXMIDCAP", "^CNXSMALLCAP"];
    const results = await yahooFinance.quote(symbols, {}, queryOptions);
    const indices = results.map((index) => {
      let name = index.shortName;
      if (name.includes("S&P BSE")) name = name.replace("S&P BSE ", "");
      return {
        name: name,
        price: index.regularMarketPrice,
        change: index.regularMarketChange,
        pChange: index.regularMarketChangePercent,
      };
    });
    res.json(indices);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch market indices." });
  }
});

module.exports = router;
