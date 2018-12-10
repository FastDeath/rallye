const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			maxlength: 128,
			trim: true
		},
		score: {
			type: Number,
			default: 0
		},
		members: {
			type: String,
			default: ""
		},
		color: {
			type: String,
			default: "#ffffff",
			maxlength: 7
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Team", teamSchema);
