const jwt = require("jsonwebtoken");
const User = require("../model/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({ error: "Request is not authorized" });
      } else {
        let user = await User.findById(decodedToken.id);
        // This makes the user info available in the next step (the controller)
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

// (The checkUser function can remain the same)
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
