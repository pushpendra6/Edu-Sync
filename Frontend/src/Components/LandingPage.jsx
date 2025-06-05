import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {

	return (
		<div className="landing-container">
			<header className="navnavbar navbar-expand-lg bg-primary px-3">
				<nav className="navbar p-3">
					<h2 className="fw-bold text-white fs-1">EduSync</h2>
					<div className="navbar-link">
						<Link to="/login" className="text-decoration-none text-white fw-bold m-4 fs-3">Login</Link>
						<Link to="/register" className="text-decoration-none text-white fw-bold m-4 fs-4">Register</Link>
					</div>
				</nav>
			</header>


			<div className="d-flex">
				<div className="collapse navbar-collapse justify-content-end" id="navbarButtons">
					<button
				        className="navbar-toggler"
				        type="button"
				        data-bs-toggle="collapse"
				        data-bs-target="#navbarButtons"
				        aria-controls="navbarButtons"
				        aria-expanded="false"
				        aria-label="Toggle navigation"
			         >
				    <span className="navbar-toggler-icon" />
			        </button>
				</div>
			</div>
			<section className="container justify-content-center mt-2 p-5">
				<div className="content-container">
					<div className="text-container">
						<h1>Empowering Smart Learning with EduSync</h1>
						EduSync is an advanced Learning Management and Assessment Platform
						designed to streamline online education and training. Whether you're
						a student tracking your learning journey or an instructor managing
						digital content, EduSync brings all essential features into one
						unified solution. Built with a focus on scalability, real-time
						analytics, and cloud-first architecture, it simplifies how modern
						education is delivered and experienced.
					</div>
					<div className="container mt-5 p-4">
						<img src="Landing.webp" alt="Landing" />
					</div>
				</div>
			</section>
			<footer className="text-center mt-3 mb-3">
				<hr />
				<p>&copy; {new Date().getFullYear()} EduSync LMS</p>
				<p>About Us | Carrer | Blog | Contact Us </p>
			</footer>
		</div>
	);
};

export default LandingPage;
