const express = require("express");
const router = express.Router();
const Team = require("../../models/team.model.js");
const passport = require("passport");
const PushService = require("../../utils/PushService");

router.get("/", async function(req, res) {
	console.log(req.headers, req.isAuthenticated());
	const teams = await Team.find()
		.sort([["score", -1]])
		.exec();
	res.json({
		teams
	});
});

router.post("/new", async function(req, res) {
	console.log(req.headers, req.isAuthenticated());
	const team = await Team.create({
		name: "New Team"
	});
	res.json({ team });
});

router.put(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	async function(req, res) {
		const team = await Team.findById(req.params.id);
		if (!team) throw new Error("Team not found");
		team.name = req.body.name;
		team.members = req.body.members;
		team.color = req.body.color.hex || req.body.color;
		await team.save();
		res.json({ success: true });
	}
);

router.post(
	"/:id/points",
	passport.authenticate("jwt", { session: false }),
	async function(req, res) {
		let team = await Team.findById(req.params.id);
		if (!team) throw new Error("Team not found");

		const points = +req.body.points;

		if (points == 0) {
			res.json({ success: true, score: team.score });
			return;
		}

		team = await Team.findOneAndUpdate(
			{ _id: team._id },
			{ $inc: { score: points } },
			{ new: true }
		);

		if (!team) throw new Error("Team could not be updated");

		PushService.updateAll(`${team.name} erhält ${points} Punkte.`);
		res.json({ success: true, score: team.score });
	}
);

router.post(
	"/hint",
	passport.authenticate("jwt", { session: false }),
	async function(req, res) {
		if (!req.body.message) throw new Error("No message");
		const reach = await PushService.hintAll(req.body.message);
		res.json({ success: true, reach });
	}
);
module.exports = router;
