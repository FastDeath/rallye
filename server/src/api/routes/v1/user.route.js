const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
	res.json([
		{
			name: "Stuff",
			gay: 1337
		},
		{
			name: "Thangs",
			gay: 42
		}
	]);
});

module.exports = router;
