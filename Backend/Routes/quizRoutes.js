const express = require("express");
const router = express.Router();
const { getQuestionsByTag } = require("../Controller/quizController");
const authenticateToken = require("../Middleware/auth");

router
    .route('/questions/:category')
    .get(getQuestionsByTag);

module.exports = router;
