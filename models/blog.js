const { Schema, model } = require("mongoose");

const blog = Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
		},
		author: {
			type: Schema.ObjectId,
			ref: "user",
		},
	},
	{ timestamps: true }
);

const blogSchema = model("blog", blog);
module.exports = blogSchema;
