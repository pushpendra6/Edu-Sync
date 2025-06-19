const  { GoogleGenerativeAI } =  require('@google/generative-ai')
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getCourseSummary = async (courseName) => {
	const prompt = `Summarize the key learning outcomes of a course titled "${courseName}" in 3-4 bullet points.`;

	try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
		const result = await model.generateContent(prompt);
		const response = result.response;
		const data =  response.text();
		

		if (!data) {
			throw new Error(data.error.message || " Gemini Ai Error");
		}
		return data;
	} catch (error) {
		console.error("Gemini API error:", error.message);
		throw new Error("Failed to generate course summary.");
	}
};

module.exports = { getCourseSummary };
