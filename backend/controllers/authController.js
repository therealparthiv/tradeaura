const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// SIGNUP
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const token = createToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false, // ✅ false for localhost, true in prod with HTTPS
      })
      .json({ message: "User registered", user: { name, email } });
  } catch (err) {
    res.status(500).json({ message: "Signup error", error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax", // ✅ cross-origin cookie sharing
        secure: false, // ✅ only false for local testing
      })
      .json({ message: "Login successful", user: { name: user.name, email } });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

// GET PROFILE (Protected)
exports.getProfile = async (req, res) => {
  res.json({ message: "Profile loaded", user: req.user });
};

// LOGOUT
exports.logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};
