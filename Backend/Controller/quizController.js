const Quiz = require('../Model/quizModel');
const  { authenticateToken } = require('../Middleware/auth')

// Fetch questions by tag (e.g., Python, React)
const getQuestionsByTag = async (req, res) => {
  try {
    const tag = req.params.category;
    if (!tag) {
      return res.status(400).json({ message: "Quiz not Exist" });
    }

    const questions = await Quiz.find({ tags: tag });
    console.log("Fetched questions:", questions);
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getQuestionsByTag,
};
