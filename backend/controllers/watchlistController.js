const User = require("../model/User");

// GET the user's watchlist
module.exports.get_watchlist = async (req, res) => {
  try {
    // res.locals.user is attached from the requireAuth middleware
    const user = res.locals.user;
    await user.populate("watchlist");
    res.status(200).json({ watchlist: user.watchlist });
  } catch (err) {
    console.error("Error fetching watchlist:", err);
    res.status(400).json({ error: "Could not retrieve watchlist" });
  }
};

// ADD an item to the user's watchlist
module.exports.add_to_watchlist = async (req, res) => {
  const { uid, name } = req.body;
  try {
    const user = res.locals.user;
    // Check if the item is already in the watchlist
    const exists = user.watchlist.some((item) => item.uid === uid);
    if (exists) {
      return res.status(409).json({ error: "Item already in watchlist" });
    }
    user.watchlist.push({ uid, name });
    await user.save();
    res
      .status(201)
      .json({ message: "Added to watchlist", item: { uid, name } });
  } catch (err) {
    console.error("Error adding to watchlist:", err);
    res.status(400).json({ error: "Could not add to watchlist" });
  }
};

// REMOVE an item from the user's watchlist
module.exports.remove_from_watchlist = async (req, res) => {
  const { uid } = req.params; // Get uid from URL parameter
  try {
    const user = res.locals.user;
    // Find the index of the item to remove
    const itemIndex = user.watchlist.findIndex((item) => item.uid === uid);
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in watchlist" });
    }
    user.watchlist.splice(itemIndex, 1);
    await user.save();
    res.status(200).json({ message: "Removed from watchlist" });
  } catch (err) {
    console.error("Error removing from watchlist:", err);
    res.status(400).json({ error: "Could not remove from watchlist" });
  }
};
