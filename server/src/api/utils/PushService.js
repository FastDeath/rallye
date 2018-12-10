const webpush = require("web-push");
const Subscription = require("../models/subscription.model.js");
const {
	gcmApiKey,
	vapidSubject,
	vapidPublicKey,
	vapidPrivateKey
} = require("../../config/vars");

// VAPID keys should only be generated only once.
// const vapidKeys = webpush.generateVAPIDKeys();
// console.log("vapidKeys:", vapidKeys);

// Use this to generate a wonderful byte array for client side js :)
// console.log(
// 	JSON.stringify(
// 		Array.prototype.slice.call(
// 			Buffer.from(vapidKeys.publicKey, "base64"),
// 			0
// 		)
// 	)
// );

// configure VAPID with stuff from env
webpush.setGCMAPIKey(gcmApiKey);
webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);

exports.sendPush = async function(subscription) {
	try {
		var res = await webpush.sendNotification(
			subscription,
			"Hello from Backend! :D"
		);
		// console.log("push res:", res);
	} catch (err) {
		console.error("push failed:", err);
	}
};

exports.updateAll = function(msg) {
	return exports.pushAll({
		notification: {
			title: "Rallye Update",
			body: msg,
			vibrate: [100, 300, 50, 50, 500],
			tag: Date.now().toString(),
			silent: false,
			renotify: true
		},
		event: {
			updateTeams: true
		}
	});
};

exports.hintAll = function(msg) {
	return exports.pushAll({
		notification: {
			title: "Rallye - Nachricht an alle",
			body: msg,
			vibrate: [50, 50, 50, 50, 50],
			tag: Date.now().toString(),
			silent: false,
			renotify: true
		}
	});
};

exports.pushAll = async function(data) {
	const subscriptions = await Subscription.find();
	console.log("notifying", subscriptions.length);

	const res = await Promise.all(
		subscriptions.map(sub =>
			webpush.sendNotification(sub, JSON.stringify(data)).catch(err => {
				console.error(err);
				return err;
			})
		)
	);

	const goners = res.filter(
		err =>
			err instanceof Error &&
			err.name == "WebPushError" &&
			err.statusCode == 410 // Gone
	);
	console.log("%d gone, deleting..", goners.length);

	await Promise.all(
		goners.map(err => {
			return Subscription.remove({
				endpoint: err.endpoint
			});
		})
	);

	const failures = res.filter(err => err instanceof Error);
	console.log("%d sent, %d failed", subscriptions.length, failures.length);

	return Math.max(0, subscriptions.length - failures.length);
};
