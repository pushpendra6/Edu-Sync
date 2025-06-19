const express = require("express");
const router = express.Router();
const { summarizeCourse } = require("../Controller/aiController");

router.post("/summarize-course", summarizeCourse);

module.exports = router;