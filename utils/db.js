const mongoose = require("mongoose");

const URL = process.env.MONGO_DB_URL;

const connectDB = async () => {
	try {
		await mongoose.connect(URL);
		console.log("MongoDB Connected");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

module.exports = connectDB;
