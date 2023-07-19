const jwt = require('jsonwebtoken');
const User = require('../models/users');

const checkUser = (req, res, next) => {
	const token = req.session.jwt;

	// check if token exists
	if (token) {
		jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.locals.user = null;
				next();
			} else {
                
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports = { checkUser };