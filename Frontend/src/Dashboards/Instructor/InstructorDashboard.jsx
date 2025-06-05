import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './InstructorDashboard.css';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../Redux/userSlice';

const courses = [
	{ id: 1, name: "Frontend Development", image: "frontend.jpg", price: 199 },
	{ id: 2, name: "Backend Development", image: "backend.jpg", price: 249 },
	{ id: 3, name: "Full-Stack Web Development", image: "fullstack.jpg",price: 399,},
	{ id: 4, name: "Block-Chain", image: "blockchain.jpeg", price: 179 },
	{ id: 5, name: "Data Structures in C++", image: "dsa.jpg", price: 159 },
	{ id: 6, name: "Python Programming", image: "Python.jpg", price: 189 },
	{ id: 7, name: "DevOps with Azure", image: "devops.jpg", price: 249 },
	{ id: 8, name: "Machine Learning Fundamentals", image: "ml.png", price: 299 },
];

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
	const hanadleLogout = () => {
		dispatch(clearUser());
		localStorage.removeItem("token");
		navigate("/");
	};

  const courseUploadBtn = () =>{
    navigate('/add-courses')
  }
  return (
		<div>
			{/* Navbar */}
			<div className="nav-container text-bg-dark p-3">
				<nav className="navbar">
					<h3 className="nav-title">EduSync</h3>
					<div className="navbar-btn">
						<button className="btn btn-danger btn-lg m-2"
						    onClick={hanadleLogout}>Logout
						</button>
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
              <button className='btn btn-dark'> Edit </button>
              <button className='btn btn-outline-danger m-1'> Delete </button>
						</div>
					))}
          <button className='btn btn-secondary btn-lg m-4' onClick={courseUploadBtn}>Add Courses</button>
				</div>
			</main>
			<footer className="text-center mt-5 mb-3">
				<hr />
				<p>&copy; {new Date().getFullYear()} EduSync LMS</p>
				<p>About Us | Blog | Contact Us </p>
			</footer>
		</div>
  )
}

export default InstructorDashboard ;
