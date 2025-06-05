import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../Redux/userSlice";
import { useDispatch , useSelector } from "react-redux";

const courses = [
	{ id: 1, name: "Frontend Development", image: "frontend.jpg", price: 199 },
	{ id: 2, name: "Backend Development", image: "backend.jpg", price: 249 },
	{id: 3, name: "Full-Stack Web Development",image: "fullstack.jpg",price: 399},
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
	const hanadleLogout = () => {
		dispatch(clearUser());
		localStorage.removeItem("token");
		navigate("/");
	};
	return (
		<div>
			{/* Navbar */}
			<div className="nav-container text-bg-primary p-3">
							<nav className="navbar d-flex justify-content-between align-items-center">
				<h1 className="nav-title-link">EduSync</h1>
				
				<div className="d-flex align-items-center">
					<Link className="btn btn-warning btn-lg mx-4 p-2" to="/student-dashboard/quiz">Quiz</Link>
					
					{/* Profile Circle */}
					<div className="position-relative">
						<div
							className="rounded-circle bg-warning text-white d-flex justify-content-center align-items-center"
							style={{ width: '40px', height: '40px', cursor: 'pointer' }}
							onClick={() => setShowProfile(!showProfile)}
						>
							{user.name ? user.name.charAt(0).toUpperCase() : 'U'}
							
						</div>
						<h6 className="text-black mt-1">Profile</h6>

						{/* Profile Dropdown */}
						{showProfile && (
							<div className="position-absolute bg-white p-3 rounded shadow" style={{ right: 0, top: '45px', minWidth: '200px', zIndex: 10 }}>
								<p className="mb-1 fw-bold text-black">Name: {user.name}</p>
								<p className="mb-1 text-black">Role: {user.role}</p>
								<Link to="/student-dashboard/profile" className="btn btn-sm btn-outline-primary w-100 mt-2">View Profile</Link>
								<button onClick={hanadleLogout} className="btn btn-sm btn-danger w-100 mt-2">Logout</button>
							</div>
						)}
					</div>

					
				</div>
			</nav>
			</div>
			<main>
				<div className="courses card">
					{courses.map((courses) => (
						<div key={courses.id} className=" course card-body">
							<img src={`/${courses.image}`} alt={courses.name}
								className="card-img-top"/>
								
							<h5 className="card-title">{courses.name}</h5>
							<p className="card-text">${courses.price}</p>
							<button class="btn btn-primary">Enroll</button>
						</div>
					))}
					
				</div>
			</main>
			<footer className="text-center mt-5 mb-3">
				<hr />
				<p>&copy; {new Date().getFullYear()} EduSync LMS</p>
				<p>About Us | Blog | Contact Us </p>
			</footer>
		</div>
	);
};

export default StudentDashboard;
