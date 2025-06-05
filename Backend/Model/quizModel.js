const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
        uinque: true, // Ensure each question is unique
	},
	options: {
		type: [String],
		required: true,
	},
	answer: {
		type: String,
		required: true,
	},
	tags: {
		type: [String], // e.g., ['Python', 'React']
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("quiz", quizSchema);
