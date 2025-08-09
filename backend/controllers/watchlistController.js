const Watchlist = require("../model/WatchlistModel");

exports.getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.findOne({ user: req.user._id });
    if (!watchlist) return res.json({ stocks: [] });
    res.json(watchlist); // sends { _id, user, stocks }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
};

exports.addStock = async (req, res) => {
  try {
    const { symbol } = req.body;
    if (!symbol) return res.status(400).json({ error: "Symbol is required" });

    let watchlist = await Watchlist.findOne({ user: req.user._id });
    if (!watchlist) {
      watchlist = new Watchlist({ user: req.user._id, stocks: [] });
    }

    if (watchlist.stocks.some((s) => s.symbol === symbol)) {
      return res.status(400).json({ error: "Stock already in watchlist" });
    }

    watchlist.stocks.push({ symbol });
    await watchlist.save();

    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to add stock" });
  }
};

exports.removeStock = async (req, res) => {
  try {
    const { symbol } = req.params;
    let watchlist = await Watchlist.findOne({ user: req.user._id });

    if (!watchlist)
      return res.status(404).json({ error: "Watchlist not found" });

    watchlist.stocks = watchlist.stocks.filter((s) => s.symbol !== symbol);
    await watchlist.save();

    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove stock" });
  }
};
