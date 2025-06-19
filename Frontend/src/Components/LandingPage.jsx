import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<div className="landing-container min-vh-100 d-flex flex-column">
			<header className="navbar navbar-expand-lg bg-primary">
				<nav className="container-fluid px-3">
					<h2 className="fw-bold text-white fs-1 m-0">EduSync</h2>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="collapse navbar-collapse justify-content-end"
						id="navbarNav"
					>
						<div className="navbar-nav">
							<Link to="/login" className="nav-link custom-navlink  fw-bold fs-5">
								Login
							</Link>
							<Link to="/register" className="nav-link fw-bold fs-5">
								Register
							</Link>
						</div>
					</div>
				</nav>
			</header>
			<section className="container flex-grow-1 d-flex align-items-center justify-content-center mt-2 p-3">
                <div className="row w-100 align-items-center">
                    <div className="col-12 col-md-6 mb-4 mb-md-0">
                        <div className="text-container">
                            <h1 className="fw-bold mb-3 text-center text-md-start" style={{ fontSize: "2.5rem" }}>
                                Empowering Smart Learning with EduSync
                            </h1>
                            <p className="lead text-center text-md-start">
                                EduSync is an advanced Learning Management and Assessment Platform
                                designed to streamline online education and training. Whether you're
                                a student tracking your learning journey or an instructor managing
                                digital content, EduSync brings all essential features into one
                                unified solution. Built with a focus on scalability, real-time
                                analytics, and cloud-first architecture, it simplifies how modern
                                education is delivered and experienced.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-center">
                        <img
                            src="Landing.webp"
                            alt="Landing"
                            className="img-fluid rounded shadow"
                            style={{ maxHeight: "350px", width: "100%", objectFit: "cover" }}
                        />
                    </div>
                </div>
            </section>

			     <footer className="text-center mt-auto mb-3 container">
                <hr />
                <p className="mb-1">&copy; {new Date().getFullYear()} EduSync LMS</p>
                <div className="d-flex flex-wrap justify-content-center gap-3 small">
                    <span>About Us</span>
                    <span>|</span>
                    <span>Career</span>
                    <span>|</span>
                    <span>Blog</span>
                    <span>|</span>
                    <span>Contact Us</span>
                </div>
            </footer>
			{/* <footer className="text-center mt-3 mb-3">
				<hr />
				<p>&copy; {new Date().getFullYear()} EduSync LMS</p>
				<p>About Us | Carrer | Blog | Contact Us </p>
			</footer> */}
		</div>
	);
};

export default LandingPage;
