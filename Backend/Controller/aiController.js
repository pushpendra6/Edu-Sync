const { getCourseSummary, chatWithGemini } = require('../Services/aiService');

const summarizeCourse = async (req, res) => {
  const { courseName } = req.body;

  if (!courseName) {
    return res.status(400).json({ error: "Course name is required" });
  }

  try {
    const summary = await getCourseSummary(courseName);
    res.json({ summary });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "Failed to generate summary" });
  }
};


const chatWithBot = async (req, res) => {
	const { prompt } = req.body;
  const preparedPrompt = `Genrate only 40 words for this ${prompt}`

	if (!prompt || typeof prompt !== "string") {
		return res.status(400).json({ reply: "Invalid prompt." });
	}

	try {
		const reply = await chatWithGemini(preparedPrompt);
		res.json({ reply });
	} catch (error) {
		console.error("Chatbot Error:", error.message);
		res.status(500).json({ reply: "Something went wrong while processing your query." });
	}
};

module.exports = { summarizeCourse, chatWithBot};