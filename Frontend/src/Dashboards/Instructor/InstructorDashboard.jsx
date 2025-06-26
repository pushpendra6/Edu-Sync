import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./InstructorDashboard.css";
import { useDispatch } from "react-redux";
import { clearUser } from "../../Redux/userSlice";

const InstructorDashboard = () => {
	const [courses, setCourses] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showPopup, setShowPopup] = useState(false);


	const hanadleLogout = () => {
		dispatch(clearUser());
		localStorage.removeItem("token");
		navigate("/");
	};


	const fetchCourses = async () => {
			try {
				const res = await fetch("http://localhost:5000/course/getall-courses"); // Replace with your API URL
				if (!res.ok) throw new Error("Failed to fetch books");
				const data = await res.json();
				setCourses(data);
			} catch (err) {
				window.alert(err.message);
			}
		};
		useEffect(() => {
			fetchCourses();
		}, []);
	return (
		<div className="min-vh-100 d-flex flex-column">
			{/* Navbar */}
			<div className="nav-container text-bg-dark p-3">
				<nav className="navbar">
					<h3 className="nav-title">EduSync</h3>
					<div className="navbar-btn">
					<Link
						className="btn btn-secondary btn-lg"
						to="/add-courses"
					>
						Add Courses
					</Link>
						<button
							className="btn btn-danger btn-lg m-2"
							onClick={hanadleLogout}
						>
							Logout
						</button>
					</div>
				</nav>
			</div>
			<main>
				<div className="container flex-grow-1 py-4">
					{courses.map((course) => (
						<div
							key={course._id}
							className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
						>
							<div className="card flex-fill h-100 shadow-sm border-0">
								<img
									src={course.courseImage}
									alt={course.name}
									className="card-img-top"
									style={{
										height: "160px",
										objectFit: "cover",
										borderTopLeftRadius: "0.5rem",
										borderTopRightRadius: "0.5rem",
									}}
								/>
								<div className="card-body d-flex flex-column ">
									<h5 className="card-title">{course.name}</h5>
									<p className="card-text mb-2 fw-semibold">${course.price}</p>
									<p className="card-text mb-2 ">Description - {course.description}</p>
									<p className="card-text mb-2 ">Course Level - {course.level}</p>
									<p className="card-text mb-2 ">Duration - Duration - {Math.floor(course.duration / 60)} hrs &{" "}
										{course.duration % 60} min</p>
									<button
										className="btn btn-warning mt-2 w-100"
									>
										Edit
									</button>
									<button className="btn btn-danger mt-2" onClick={()=> setShowPopup(true)}>Delete</button>
								</div>
							</div>
						</div>
					))}
					{/* Summary Pop-Up */}
					{(showPopup) && (
						<div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center">
							<div
								className="bg-white p-4 rounded shadow text-center"
								style={{ maxWidth: "600px", width: "90%" }}
							>
								<h4>Yes Delete this Course.</h4>
							<button className="btn btn-danger m-3">Confirm</button>
								<button
									className="btn btn-info m-3"
									onClick={()=> setShowPopup(false)}
								>
									Close
								</button>
							</div>
						</div>
					)}
				</div>
			</main>
			<footer className="text-center mt-auto mb-3">
				<hr />
				<p>&copy; {new Date().getFullYear()} EduSync LMS</p>
				<p>About Us | Blog | Contact Us </p>
			</footer>
		</div>
	);
};

export default InstructorDashboard;
