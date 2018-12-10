const express = require("express");
const userRoutes = require("./user.route");
const teamRoutes = require("./team.route");
const authRoutes = require("./auth.route");
const pushRoutes = require("./push.route");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => {
	res.send("OK");
});

/**
 * GET v1/docs
 */
router.use("/docs", express.static("docs"));

router.use("/users", userRoutes);
router.use("/teams", teamRoutes);
router.use("/auth", authRoutes);
router.use("/push", pushRoutes);

module.exports = router;
