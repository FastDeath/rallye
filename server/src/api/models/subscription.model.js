const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
	{
		endpoint: {
			type: String,
			unique: true
		},
		keys: {
			type: Object
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
