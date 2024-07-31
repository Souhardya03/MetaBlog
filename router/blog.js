const { Router } = require("express");
const blogSchema = require("../models/blog");
const { requireSignIn } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = Router();

// Multer configuration
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const userDir = path.join(
			__dirname,
			"../uploads",
			req.user.userId.toString()
		);

		// Check if directory exists, if not create it
		if (!fs.existsSync(userDir)) {
			fs.mkdirSync(userDir, { recursive: true });
		}

		cb(null, userDir);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix =
			Date.now() +
			"-" +
			file.originalname.substring(0, file.originalname.indexOf("."));
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
		);
	},
});

const upload = multer({ storage: storage });

// Add new blog
router.post(
	"/add-new",
	requireSignIn,
	upload.single("thumbnail"),
	async (req, res) => {
		const { title, content } = req.body;
		const author = req.user.userId;
		const thumbnail = req.file
			? `/uploads/${author}/${req.file.filename}`
			: null;
		const newBlog = await blogSchema.create({
			title,
			thumbnail,
			content,
			author,
		});
		return res.status(200).redirect("/");
	}
);

//display all blogs
router.get("/all-blogs", async (req, res) => {
	try {
		const blogs = await blogSchema.find().populate("author", "-password");
		if (!blogs) return res.status(404).json({ message: "No blogs found" });
		return res.status(200).json(blogs);
	} catch (error) {
		console.log("Error from blogs", error);
	}
});

//display blog by id
router.get("/:id", async (req, res) => {
	try {
		const blogId = req.params.id;
		const blog = await blogSchema
			.findById(blogId)
			.populate("author", "-password");
		if (!blog) return res.status(404).json({ message: "Blog not found" });
		return res.status(200).json(blog);
	} catch (error) {
		console.log("Error from blog", error);
	}
});

module.exports = router;
