import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const courses = [
	{ id: 1, name: "Frontend Development", image: "frontend.jpg", price: 199 },
	{ id: 2, name: "Backend Development", image: "backend.jpg", price: 249 },
	{
		id: 3,
		name: "Full-Stack Web Development",
		image: "fullstack.jpg",
		price: 399,
	},
	{ id: 4, name: "Block-Chain", image: "blockchain.jpeg", price: 179 },
	{ id: 5, name: "Data Structures in C++", image: "dsa.jpg", price: 159 },
	{ id: 6, name: "Python Programming", image: "Python.jpg", price: 189 },
	{ id: 7, name: "DevOps with Azure", image: "devops.jpg", price: 249 },
	{ id: 8, name: "Machine Learning Fundamentals", image: "ml.png", price: 299 },
];

const StudentDashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showProfile, setShowProfile] = useState(false);
	const user = useSelector((state) => state.user);
	const [summary, setSummary] = useState("");
	const [loadingSummary, setLoadingSummary] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [summaryCourse, setSummaryCourse] = useState("");
	const hanadleLogout = () => {
		dispatch(clearUser());
		localStorage.removeItem("token");
		navigate("/");
	};

	const handleSummarize = async (courseName) => {
		setSummaryCourse(courseName);
		setShowPopup(true);
		setLoadingSummary(true);
		setSummary("");
		try {
			const response = await fetch(
				"http://localhost:5000/api/ai/summarize-course",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ courseName }),
				}
			);

			const data = await response.json();
			if(data.summary){
				setSummary(data.summary);
			}else{
				setSummary("No summary returned")
			}
			
		} catch (err) {
			setSummary("Failed to generate summary.");
			console.error(err);
		}
		setLoadingSummary(false);
	};

	const handlePopupCancel = () => {
		setShowPopup(false);
		setSummary("");
		setLoadingSummary(false);
	};
	return (
		<div className="min-vh-100 d-flex flex-column">
			{/* Navbar */}
			<div className="nav-container text-bg-primary p-2 p-md-3">
				<nav className="navbar navbar-expand-lg d-flex flex-wrap flex-md-nowrap justify-content-between align-items-center container-fluid">
					<h1 className="nav-title-link text-white fw-bold fs-2 m-0">
						EduSync
					</h1>
					<div className="d-flex align-items-center mt-3 mt-md-0">
						<Link
							className="btn btn-warning btn-lg mx-2 mx-md-4 px-3 py-2 fw-semibold shadow-sm"
							to="/student-dashboard/quiz"
							style={{
								borderRadius: "30px",
								letterSpacing: "1px",
								fontSize: "1.1rem",
								transition: "background 0.2s, color 0.2s",
							}}
						>
							<i className="bi bi-question-circle me-2"></i>Quiz
						</Link>
						{/* Profile Circle */}
						<div className="position-relative ms-2 ms-md-4">
							<div
								className="rounded-circle d-flex justify-content-center align-items-center shadow"
								style={{
									width: "48px",
									height: "48px",
									background:
										"linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
									color: "#fff",
									fontWeight: "bold",
									fontSize: "1.3rem",
									cursor: "pointer",
									border: showProfile ? "2px solid #0d6efd" : "2px solid #fff",
									transition: "border 0.2s",
									boxShadow: showProfile ? "0 0 0 4px #0d6efd22" : "none",
								}}
								onClick={() => setShowProfile(!showProfile)}
								title="Profile"
							>
								{user.name ? user.name.charAt(0).toUpperCase() : "U"}
							</div>
							<h6 className="text-white text-center mt-1 mb-0 small d-none d-md-block">
								Profile
							</h6>
							{/* Profile Dropdown */}
							{showProfile && (
								<div
									className="position-absolute bg-white p-3 rounded shadow"
									style={{
										right: 0,
										top: "54px",
										minWidth: "220px",
										zIndex: 10,
										border: "1px solid #eee",
									}}
								>
									<p className="mb-1 fw-bold text-black">Name: {user.name}</p>
									<p className="mb-1 text-black">Role: {user.role}</p>
									<Link
										to="/student-dashboard/profile"
										className="btn btn-sm btn-outline-primary w-100 mt-2"
									>
										View Profile
									</Link>
									<button
										onClick={hanadleLogout}
										className="btn btn-sm btn-danger w-100 mt-2"
									>
										Logout
									</button>
								</div>
							)}
						</div>
					</div>
				</nav>
			</div>
			<main className="container flex-grow-1 py-4">
				<div className="row g-4">
					{courses.map((course) => (
						<div
							key={course.id}
							className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
						>
							<div className="card flex-fill h-100 shadow-sm border-0">
								<img
									src={`/${course.image}`}
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
									<p className="card-text mb-2 fw-semibold text-danger">
										${course.price}
									</p>
									<button className="btn btn-dark mt-auto w-100">Enroll</button>
									<button
										className="btn btn-primary mt-2 w-100"
										onClick={() => handleSummarize(course.name)}
									>
										Summarize
									</button>
								</div>
							</div>
						</div>
					))}
					{/* Summary Pop-Up */}
					{(showPopup || loadingSummary) && (
						<div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center">
							<div
								className="bg-white p-4 rounded shadow text-center"
								style={{ maxWidth: "600px", width: "90%" }}
							>
								{loadingSummary && (
									<>
										<h4 className="mb-3">Generating Summary...</h4>
									</>
								)}

								{!loadingSummary && summary && (
									<>
										<h5 className="mb-3">Summary of {summaryCourse}</h5>
										<div
											className="alert alert-info text-start"
											style={{ whiteSpace: "pre-line" }}
										>
											{summary}
										</div>
									</>
								)}

								<button
									className="btn btn-secondary mt-3"
									onClick={handlePopupCancel}
								>
									Close
								</button>
							</div>
						</div>
					)}
				</div>
			</main>
			<div></div>
			<footer className="text-center mt-auto p-3">
				<hr />
				<p className="m-0">&copy; {new Date().getFullYear()} EduSync LMS</p>
				<div className="d-flex flex-wrap justify-content-center gap-3 small">
					<span>About Us</span>
					<span>|</span>
					<span>Blog</span>
					<span>|</span>
					<span>Contact Us</span>
				</div>
			</footer>
		</div>
	);
};

export default StudentDashboard;
