const path = require("path");

// import .env variables
require("dotenv-safe").load({
	path: path.join(__dirname, "../../.env"),
	sample: path.join(__dirname, "../../.env.example")
});

module.exports = {
	env: process.env.NODE_ENV,
	port: process.env.PORT,
	jwtSecret: process.env.JWT_SECRET,
	jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
	mongo: {
		uri: process.env.MONGO_URI
	},
	logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
	gcmApiKey: process.env.GCM_APIKEY,
	vapidSubject: process.env.VAPID_SUBJECT,
	vapidPrivateKey: process.env.VAPID_PRIVATE,
	vapidPublicKey: process.env.VAPID_PUBLIC,
	adminPassword: process.env.ADMIN_PASSWORD
};
