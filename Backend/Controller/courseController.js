const Course = require("../Model/CourseModel");

//get course from db
const getAllCourses = async (req, res) => {
	try {
		const courses = await Course.find();

		const processedCourses = courses.map((course) => ({
			_id: course._id,
			name: course.name,
			description: course.description,
			instructor: course.instructor,
			price: course.price,
			category: course.category,
			level: course.level,
			duration: course.duration,
			createdAt: course.createdAt,
			courseImage: course.courseImage?.data
				? `data:${course.courseImage.contentType}
				  ;base64,${course.courseImage.data}`
				: null,
		}));

		res.status(200).json(processedCourses);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching courses", error: error.message });
	}
};

//add course
const addCourse = async (req, res) => {
	try {
		const { name, description, instructor, price, category, level, duration } =
			req.body;

		if (
			!name ||
			!description ||
			!instructor ||
			!price ||
			!category ||
			!level ||
			!duration ||
			!req.files?.courseImage
		) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const base64String = req.files.courseImage[0].buffer.toString("base64");
		const contentType = req.files.courseImage[0].mimetype;

		const newCourse = new Course({
			name,
			description,
			instructor,
			price,
			category,
			level,
			duration,
			courseImage: {
				data: base64String,
				contentType: contentType,
			},
		});

		await newCourse.save();
		res
			.status(201)
			.json({ message: "Course added successfully", Course: newCourse });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: "Failed to add Course", error: error.message });
	}
};

//delete course
const deleteCourse = async (req, res) => {
	try {
		const CourseId = req.params.id;
		const deletedCourse = await Course.findByIdAndDelete(CourseId);

		if (!deletedCourse) {
			return res.status(404).json({ message: "Course not found" });
		}

		res.status(200).json({ message: "Course deleted successfully" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error deleting Course", error: error.message });
	}
};

module.exports = {
	getAllCourses,
	addCourse,
	deleteCourse,
};
