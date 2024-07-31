const jwt = require("jsonwebtoken");

const requireSignIn = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res
				.status(401)
				.redirect("/auth");
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		res.clearCookie("token");
		res.clearCookie("user");
		res.status(401).redirect("/auth");
		console.error("Error from middleware\n", error);
	}
};

module.exports = {requireSignIn}
