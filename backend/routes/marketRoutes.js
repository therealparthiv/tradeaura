const express = require("express");
const yahooFinance = require("yahoo-finance2").default;
const router = express.Router();

const queryOptions = { validateResult: false };

// --- Price, Search, and History Routes (These are correct and do not need changes) ---
router.get("/price/:symbol", async (req, res) => {
  // ... your existing price logic ...
});
router.get("/search-stocks", async (req, res) => {
  // ... your existing search logic ...
});
router.get("/history/:symbol", async (req, res) => {
  // ... your existing history logic ...
});

// --- 🚀 CORRECTED: Market Indices Route ---
router.get("/indices", async (req, res) => {
  try {
    const symbols = ["^NSEI", "^BSESN", "^CNXMIDCAP", "^CNXSMALLCAP"];
    const results = await yahooFinance.quote(symbols, {}, queryOptions);

    const indices = results.map((index) => {
      // The fix: Use a safer way to shorten the name without breaking "NIFTY 50"
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
    console.error("Indices fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch market indices." });
  }
});

module.exports = router;
