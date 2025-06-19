import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';

const Quiz = () => {
    const navigate = useNavigate();
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const handleQuizClick = (quiz) => {
		setSelectedQuiz(quiz);
	};
	const handleStartQuiz = () => {
		if (selectedQuiz) {
			navigate(`/quiz/${selectedQuiz}`);
		}
	}
  
	return (
		<div className="min-vh-100 d-flex flex-column">
			{/* Navbar */}
			<header className="navnavbar navbar-expand-lg bg-primary px-3">
				<nav className="navbar justify-content-center">
					<Link
						to="/student-dashboard"
						className="fw-bold fs-1 m-2 p-2 text-white text-decoration-none"
					>
						EduSync
					</Link>
				</nav>
			</header>

			<main>
				<div className="align-items-center d-flex flex-column mb-5">
					<div className="card p-4 shadow col-12 col-md-6 col-lg-4 mt-5">
						<h2 className="text-center mb-4">Quiz Menu</h2>
						<p className="text-center">Select a quiz to start:</p>
						<ul className="list-group text-decoration-none">
							{['Quant', 'Python', 'React', 'C++', 'Node', 'AI&ML'].map((quiz, index) => (
								<li
									key={index}
									className="list-group-item"
									onClick={() => handleQuizClick(quiz)}
									style={{ cursor: 'pointer' }}
								>
									{quiz}
								</li>
							))}
						</ul>
					</div>

					{/* Start Confirmation Section */}
					{selectedQuiz && (
						<div className="card mt-4 p-4 shadow col-12 col-md-6 col-lg-4">
							<h4 className="text-center">Start Quiz: <strong>{selectedQuiz}</strong>?</h4>
							<div className="d-flex justify-content-around mt-3">
								<button className="btn btn-success" onClick={handleStartQuiz}>
									Start
								</button>
								<button className="btn btn-danger" onClick={() => setSelectedQuiz('')}>
									Cancel
								</button>
							</div>
						</div>
					)}
				</div>
			</main>
			<hr />
<footer className="text-center mt-auto p-3">
				<hr />
				<p className="m-0">&copy; {new Date().getFullYear()} EduSync LMS</p>
			</footer>
			
		</div>
	);
};

export default Quiz;
