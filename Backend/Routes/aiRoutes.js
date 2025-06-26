const express = require("express");
const router = express.Router();
const { summarizeCourse,chatWithBot } = require("../Controller/aiController");

router.post("/summarize-course", summarizeCourse);
router.post("/chat", chatWithBot);

module.exports = router;