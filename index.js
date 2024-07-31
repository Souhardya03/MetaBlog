require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./utils/db");
const PORT = process.env.PORT || 8000;
const userRoute = require("./router/user");
const blogRoute = require("./router/blog");
const commonRoute = require("./router/common");
const path = require("path");
const cookiePaser = require("cookie-parser");



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname,"public")))
app.use(express.static(path.join(__dirname,"assets")))

//views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.use("/api/users", userRoute);
app.use("/api/blog", blogRoute);
app.use("/",commonRoute)

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
