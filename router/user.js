const { Router } = require("express");
const UserSchema = require("../models/user");
const { hashedPassword, verifyPassword } = require("../helpers/authHelper");
const jwt = require("jsonwebtoken");
const router = Router();

//signup
router.post("/signup", async (req, res) => {
	const { fullName, email, password } = req.body;
	try {
		const hashPassword = hashedPassword(password);
		const user = await UserSchema.create({
			fullName,
			email,
			password: hashPassword,
		});
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
	}
});

//login
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await UserSchema.findOne({ email }).select({ password: 0 });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const isValidPassword = await verifyPassword(email, password);
		if (!isValidPassword) {
			return res.status(401).json({ message: "Invalid password" });
		}
		const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
			expiresIn: "1h",
		});
		res.cookie("user", user, { httpOnly: true });
		res.cookie("token", token, { httpOnly: true });
		 return res.redirect("/")
	} catch (error) {
		console.log(error);
	}
});



module.exports = router;
