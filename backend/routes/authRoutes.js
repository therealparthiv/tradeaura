const { Router } = require("express");
const authController = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = Router();

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);

// ADDED THIS NEW PROTECTED ROUTE
router.get("/user-details", requireAuth, authController.user_details_get);

module.exports = router;
