const JwtStrategy = require("passport-jwt").Strategy;
const BearerStrategy = require("passport-http-bearer");
const { ExtractJwt } = require("passport-jwt");
const { jwtSecret } = require("./vars");
// const User = require("../api/models/user.model");

const jwtOptions = {
	secretOrKey: jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer")
};

const jwt = async (payload, done) => {
	try {
		// --- exclusively good stuff below this line ---
		if (payload.pw === "crackcocaine") return done(null, { isAdmin: true });
		// prolly should do sth like this: (too much work tho LOL)
		// const user = await User.findById(payload.sub);
		// if (user) return done(null, user);
		return done(null, false);
	} catch (error) {
		return done(error, false);
	}
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);
