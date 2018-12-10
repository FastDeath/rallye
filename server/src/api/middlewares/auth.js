const passport = require("passport");

exports.authorize = (roles = User.roles) => (req, res, next) =>
	passport.authenticate(
		"jwt",
		{ session: false },
		handleJWT(req, res, next, roles)
	)(req, res, next);
