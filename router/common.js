const { Router } = require("express");
const { requireSignIn } = require("../middlewares/auth");
const router = Router();
const blogSchema = require("../models/blog");

//render homepage
router.get("/", async (req, res) => {
	const blogs = await blogSchema.find({}).populate("author", "-password");
	res.render("homepage", {
		user: req.cookies.user,
		blogs: blogs,
		title: "Home",
		url: req.protocol + "://" + req.headers.host,
	});
});

//render login page
router.get("/auth", async (req, res) => {
	res.render("../views/auth/login.ejs", {
		title: "Login",
		url: req.protocol + "://" + req.headers.host,
	});
});

//logout
router.get("/logout", (req, res) => {
	res.clearCookie("user");
	res.clearCookie("token")
	res.redirect("/");
});

//contact page render
router.get("/contact", (req, res) => {
	res.render("../views/contact/contact.ejs", {
		user: req.cookies.user,
		title: "Contact",
		url: req.protocol + "://" + req.headers.host,
	});
});

//create blog render
router.get("/createblog", requireSignIn, (req, res) => {
	res.render("../views/blogs/create.ejs", {
		user: req.cookies.user,
		token: req.cookies.token,
		title: "Create Blog",
		url: req.protocol + "://" + req.headers.host,
	});
});

module.exports = router;
