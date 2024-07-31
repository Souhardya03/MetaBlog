const { Schema, model } = require("mongoose");

const User = Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
},{timestamps:true});

const UserSchema  = model("user",User);
module.exports = UserSchema;
