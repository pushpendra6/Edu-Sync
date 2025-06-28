import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CourseUpload = () => {
	const [courseData, setCourseData] = useState({
		name: "",
		description: "",
		instructor: "",
		price: "",
		category: "",
		level: "Beginner",
		duration: "",
		image: null,
	});
	const inputRef = useRef("");
	const fileInputRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const [showPopup, setShowPopup] = useState(false);
	const [popupType, setPopupType] = useState("");

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setCourseData((prev) => ({ ...prev, image: file }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const formData = new FormData();

			formData.append("name", courseData.name);
			formData.append("description", courseData.description);
			formData.append("instructor", courseData.instructor);
			formData.append("price", courseData.price);
			formData.append("category", courseData.category);
			formData.append("level", courseData.level);
			formData.append("duration", courseData.duration);
			formData.append("courseImage", fileInputRef.current.files[0]); // image file

			setIsLoading(true);

			const response = await fetch("/course/add-course", {
				method: "POST",
				body: formData,
			});

			const data = await response.json();

			if (!response.ok) {
				toast.error(data.message || "Submit error", { theme: "colored" });
			} else {
				alert(data.message);
				toast.success("Course uploaded successfully!", { theme: "colored" });
			    setShowPopup(true);
			    setPopupType("upload");
				// setCourseData({
				// 	name: "",
				// 	description: "",
				// 	instructor: "",
				// 	price: "",
				// 	category: "",
				// 	level: "Beginner",
				// 	duration: "",
				// 	image: null,
				// });
				// fileInputRef.current.value = null;
			}
		} catch (error) {
			console.error("Submit Error:", error);
			toast.error("Submit error", { theme: "colored" });
		} finally {
			setIsLoading(false);
		}
		
	};

	const handlePopupConfirm = () => {
		setShowPopup(false);
		setCourseData({
			name: "",
			description: "",
			instructor: "",
			price: "",
			category: "",
			level: "Beginner",
			duration: "",
			image: null,
		});
		fileInputRef.current.value = null; // <-- clear file input
		inputRef.current.focus();
	};

	const handlePopupCancel = () => {
		setShowPopup(false);
		navigate("/instructor-dashboard");
	};

	return (
		<div className="min-vh-100 d-flex flex-column">
			{/* Navbar */}
			<header className="navnavbar navbar-expand-lg bg-dark px-3">
				<nav className="navbar justify-content-center">
					<Link
						to="/instructor-dashboard"
						className=" fw-bold fs-1 m-2 p-2 text-white text-decoration-none"
					>
						EduSync
					</Link>
				</nav>
			</header>
			{/* Course Form */}
			<div className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center mb-5">
				<div
					className="card p-4 shadow w-100"
					style={{ maxWidth: "500px", marginTop: "3rem" }}
				>
					<form onSubmit={handleSubmit}>
						<h2 className="text-center mb-4">Enter the New Course Details</h2>
						{/* Course Name */}
						<div className="mb-3">
							<label htmlFor="name" className="form-label">
								Course Name
							</label>
							<input
								type="text"
								className="form-control"
								id="name"
								ref={inputRef}
								value={courseData.name}
								onChange={(e) =>
									setCourseData({ ...courseData, name: e.target.value })
								}
								placeholder="Enter course name"
								required
							/>
						</div>

						{/* Description */}
						<div className="mb-3">
							<label htmlFor="description" className="form-label">
								Description
							</label>
							<textarea
								className="form-control"
								id="description"
								rows="3"
								value={courseData.description}
								onChange={(e) =>
									setCourseData({ ...courseData, description: e.target.value })
								}
								placeholder="Enter course description"
								required
							></textarea>
						</div>

						{/* Instructor */}
						<div className="mb-3">
							<label htmlFor="instructor" className="form-label">
								Instructor Name
							</label>
							<input
								type="text"
								className="form-control"
								id="instructor"
								value={courseData.instructor}
								onChange={(e) =>
									setCourseData({ ...courseData, instructor: e.target.value })
								}
								placeholder="Enter instructor name"
								required
							/>
						</div>

						{/* Price */}
						<div className="mb-3">
							<label htmlFor="price" className="form-label">
								Price
							</label>
							<input
								type="number"
								className="form-control"
								id="price"
								value={courseData.price}
								onChange={(e) =>
									setCourseData({ ...courseData, price: e.target.value })
								}
								placeholder="Enter course price"
								required
							/>
						</div>

						{/* Category */}
						<div className="mb-3">
							<label htmlFor="category" className="form-label">
								Category
							</label>
							<input
								type="text"
								className="form-control"
								id="category"
								value={courseData.category}
								onChange={(e) =>
									setCourseData({ ...courseData, category: e.target.value })
								}
								placeholder="e.g., Web, AI"
								required
							/>
						</div>

						{/* Level */}
						<div className="mb-3">
							<label htmlFor="level" className="form-label">
								Level
							</label>
							<select
								className="form-select"
								id="level"
								value={courseData.level}
								onChange={(e) =>
									setCourseData({ ...courseData, level: e.target.value })
								}
								required
							>
								<option value="Beginner">Beginner</option>
								<option value="Intermediate">Intermediate</option>
								<option value="Advanced">Advanced</option>
							</select>
						</div>

						{/* Duration */}
						<div className="mb-3">
							<label htmlFor="duration" className="form-label">
								Duration (in minutes)
							</label>
							<input
								type="number"
								className="form-control"
								id="duration"
								value={courseData.duration}
								onChange={(e) =>
									setCourseData({ ...courseData, duration: e.target.value })
								}
								placeholder="Enter course duration in minutes"
								required
							/>
						</div>

						{/* Course Image */}
						<div className="mb-3">
							<label htmlFor="courseImage" className="form-label">
								Course Image
							</label>
							<input
								type="file"
								className="form-control"
								id="courseImage"
								accept="image/*"
								ref={fileInputRef}
								onChange={handleImageChange}
								required
							/>
						</div>

						<button type="submit" className="btn btn-primary w-100">
							{isLoading ? (
								<>
									<span
										className="spinner-border spinner-border-sm me-2"
										role="status"
										aria-hidden="true"
									></span>
									Uploading...
								</>
							) : (
								"Upload"
							)}
						</button>
					</form>
				</div>
			</div>
			{/* Popup Modal */}
			{showPopup && (
				<div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center">
					<div className="bg-white p-4 rounded shadow text-center">
						{popupType === "upload" && (
							<>
								<h4>Course is uploaded !</h4>
								<button
									className="btn btn-success m-2"
									onClick={handlePopupConfirm}
								>
									Add More Course
								</button>
								<button
									className="btn btn-secondary m-2"
									onClick={handlePopupCancel}
								>
									Home
								</button>
							</>
						)}
					</div>
				</div>
			)}
			{/* Footer */}
			<footer className="text-center mt-auto mb-3">
				<hr />
				<p>&copy; {new Date().getFullYear()} EduSync LMS</p>
				<p>About Us | Blog | Contact Us </p>
			</footer>
		</div>
	);
};

export default CourseUpload;
