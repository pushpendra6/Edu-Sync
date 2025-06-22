const mongoose = require("mongoose");

//schema
const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	instructor: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		default: 0,
		required: true,
	},
	category: {
		type: String, // web,ai etc
		required: true,
	},
	level: {
		type: String, // Beginner, Intermediate, Advanced
		default: "Beginner",
		required: true,
	},
	duration: {
		type: Number, // total course duration in minutes
		required: true,
	},
	courseImage: {
		data: {
			type: String,
			required: true,
		},
		contentType: {
			type: String,
			default: "image/jpeg", // or "image/png"
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

//model
module.exports = mongoose.model("Course", courseSchema);
