import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const QuizWindow = () => {
	const { category } = useParams();
	const [quizData, setQuizData] = useState([]);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const navigate = useNavigate();
	const name = useSelector((state) => state.user.name);
	const [timeLeft, setTimeLeft] = useState(1800);
	const [showPopup, setShowPopup] = useState(false);
	const [popupType, setPopupType] = useState("");
	// const token = useSelector((state) => state.user.token);
	// console.log("User name from Redux:", name);

	// Fetch quiz questions from API
	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await fetch(
					`http://localhost:5000/quiz/questions/${category}`,
					// {
					// 	headers: {
					// 		Authorization: `Bearer ${token}`,
					// 	},
					// }
				);
				const data = await response.json();
				if (Array.isArray(data)) {
					setQuizData(data);
				} else {
					console.error("Quiz data fetch returned an error:", data);
					setQuizData([]); // So .map won't throw error
				}
			} catch (error) {
				console.log("Error fetching quiz data:", error);
				setQuizData([]); // Avoid map crash on error
			}
			// 	setQuizData(data);
			//   console.log("Quiz data fetched:", quizData);
			// } catch (error) {
			// 	console.log("Error fetching quiz data:", error);
			// }
		};
		fetchQuestions();
	}, [category]);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev === 1) {
					clearInterval(timer);
					setPopupType("timeout");
					setShowPopup(true);
				}
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const formatTime = () => {
		const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
		const secs = String(timeLeft % 60).padStart(2, "0");
		return `${mins}:${secs}`;
	};

	const handleOptionChange = (questionIndex, selectedOption) => {
		setSelectedAnswers({
			...selectedAnswers,
			[questionIndex]: selectedOption,
		});
	};

	const handleSubmit = () => {
		if (timeLeft > 0) {
			setPopupType("submit");
			setShowPopup(true);
		} else {
			navigate("/student-dashboard/quiz"); // Navigate to quiz menu
		}
	};

	const handleEndTest = () => {
		if (timeLeft > 0) {
			setPopupType("end");
			setShowPopup(true);
		} else {
			navigate(-1); // Go back
		}
	};

	const handlePopupConfirm = () => {
		setShowPopup(false);
		if (popupType === "submit") {
			navigate("/student-dashboard/quiz");
		} else if (popupType === "end") {
			navigate("/student-dashboard/quiz");
		} else if (popupType === "timeout") {
			navigate(-1);
		}
	};

	const handlePopupCancel = () => {
		setShowPopup(false);
	};

	return (
		<div className="min-vh-100 d-flex flex-column">
			<header className="navnavbar navbar-expand-lg bg-dark px-3">
				<nav className="navbar justify-content-center">
					<h2 className=" fw-bold fs-1 m-2 p-2  text-white">
						{`Welcome ${name} `}
					</h2>
				</nav>
			</header>
			<div className="container mt-5">
				<h2 className="mb-4 text-center"> {category.toUpperCase()} Quiz</h2>

				{quizData.length === 0 ? (
					<div className="alert alert-warning text-center">
						No quiz available for now.
					</div>
				) : (
					<>
						{/* Show timer and end test only if quiz data is present */}
						<div className="text-center m-2 p-3 d-flex justify-content-between align-items-center">
							<h4>Timer : {formatTime()}</h4>
							<button className="btn btn-danger" onClick={handleEndTest}>
								End test
							</button>
						</div>

						{quizData.map((questionItem, index) => (
							<div className="card mb-4 p-3" key={index}>
								<h5>
									Q{index + 1}. {questionItem.question}
								</h5>
								<div className="mt-2">
									{questionItem.options.map((option, optionIndex) => (
										<div className="form-check" key={optionIndex}>
											<input
												className="form-check-input"
												type="radio"
												name={`question-${index}`}
												id={`question-${index}-option-${optionIndex}`}
												value={option}
												checked={selectedAnswers[index] === option}
												onChange={() => handleOptionChange(index, option)}
											/>
											<label
												className="form-check-label"
												htmlFor={`question-${index}-option-${optionIndex}`}
											>
												{option}
											</label>
										</div>
									))}
								</div>
							</div>
						))}
					</>
				)}
				{/* Popup Modal */}
				{showPopup && (
					<div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center">
						<div className="bg-white p-4 rounded shadow text-center">
							{popupType === "submit" && (
								<>
									<h4>You still have time left. Submit quiz?</h4>
									<button
										className="btn btn-success m-2"
										onClick={handlePopupConfirm}
									>
										Submit
									</button>
									<button
										className="btn btn-secondary m-2"
										onClick={handlePopupCancel}
									>
										Continue
									</button>
								</>
							)}
							{popupType === "end" && (
								<>
									<h4>You still have time left. End quiz?</h4>
									<button
										className="btn btn-danger m-2"
										onClick={handlePopupConfirm}
									>
										End Test
									</button>
									<button
										className="btn btn-secondary m-2"
										onClick={handlePopupCancel}
									>
										Continue
									</button>
								</>
							)}
							{popupType === "timeout" && (
								<>
									<h4>
										Time is over! Your quiz has Submitted results will be
										declared soon.
									</h4>
									<button
										className="btn btn-warning mt-3"
										onClick={handlePopupConfirm}
									>
										Go Back
									</button>
								</>
							)}
						</div>
					</div>
				)}

				<div className="text-center m-2 p-3">
					{quizData.length > 0 ? (
						<button className="btn btn-info" onClick={handleSubmit}>
							submit
						</button>
					) : (
						<Link className="btn btn-info" to="/student-dashboard/quiz">
							Back
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default QuizWindow;
