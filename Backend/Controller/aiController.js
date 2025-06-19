const { getCourseSummary } = require('../Services/aiService');

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

module.exports = { summarizeCourse };