const express = require("express");
const router = express.Router();
const jwt = require("jwt-simple");
const { jwtSecret, adminPassword } = require("../../../config/vars");

router.post("/", function(req, res) {
	console.log(req.headers);
	if (req.body.password === adminPassword) {
		const token = jwt.encode({ pw: "crackcocaine" }, jwtSecret);
		res.json({ success: true, token });
	} else {
		res.status(403).json({ success: false });
	}
});

module.exports = router;
