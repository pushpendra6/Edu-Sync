const express = require("express");
const multer = require("multer");
const { getAllCourses, addCourse, deleteCourse } = require("../Controller/courseController");

const router = express.Router();
const storage = multer.memoryStorage(); // Store in memory
const upload = multer({ storage });

router.route("/getall-courses").get(getAllCourses);

router.route("/add-course").post(
	upload.fields([
		{ name: "courseImage", maxCount: 1 },
	]),
	addCourse
);

router.route("/delete/:id").delete(deleteCourse);


module.exports = router;
