const express = require("express");
const Subscription = require("../../models/subscription.model.js");
const router = express.Router();

router.post("/subscribe", async function(req, res) {
	try {
		await Subscription.create({
			endpoint: req.body.endpoint,
			keys: req.body.keys
		});
		res.json({ success: true });
	} catch (err) {
		// if subscription already stored (key collision), that's alright..
		if (err.name === "MongoError" && err.code === 11000) {
			res.json({ success: true, exists: true });
		}
	}
});

module.exports = router;
