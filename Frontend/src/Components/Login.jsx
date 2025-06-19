import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userSlice";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef("");
	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:5000/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			if (!response.ok) {
				toast.error(data.message, { theme: "colored" });
				return;
			}

			// Store token in localStorage
			localStorage.setItem("token", data.token);
			dispatch(
				setUser({ name: data.name, role: data.role, token: data.token })
			);

			if (data.role === "Student") {
				setIsLoading(true);
				toast.success(`${data.message} ! , Welcome ${data.name}`, {
					theme: "colored",
				});

				navigate("/student-dashboard");
			} else {
				setIsLoading(true);
				toast.success(`Instructor Login Successfully !, Welcome ${data.name}`, {
					theme: "colored",
				});
				navigate("/instructor-dashboard");
			}
		} catch (err) {
			setError(err.message);
			toast.error(err.message, { theme: "colored" });
			setEmail("");
			setPassword("");
			setIsLoading(false);
			inputRef.current.focus();
		}
	};
	return (
		<div className="min-vh-100 d-flex flex-column">
			{/* Navbar */}
			<header className="navbar navbar-expand-lg bg-primary px-3">
				<nav className="container-fluid justify-content-center">
					<Link
						to="/"
						className="fw-bold fs-1 m-2 p-2 text-white text-decoration-none"
					>
						EduSync
					</Link>
				</nav>
			</header>
			<div className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center">
				<div
					className="card p-4 shadow w-100"
					style={{ maxWidth: "400px", marginTop: "3rem" }}
				>
					<form onSubmit={handleLogin}>
						<h2 className="text-center mb-4">Login</h2>
						<div className="mb-3">
							<label htmlFor="email" className="form-label">
								Email address
							</label>
							<input
								type="email"
								className="form-control"
								id="email"
								name="email"
								ref={inputRef}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								required
								disabled={isLoading}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label">
								Password
							</label>
							<input
								type="password"
								className="form-control"
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
								required
								disabled={isLoading}
							/>
						</div>
						<button
							type="submit"
							className="btn btn-primary w-100"
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<span
										className="spinner-border spinner-border-sm me-2"
										role="status"
										aria-hidden="true"
									></span>
									Logging in...
								</>
							) : (
								"Log In"
							)}
						</button>
					</form>
					<div className="text-center mt-3">
						{error && (
							<div className="alert alert-danger" role="alert">
								{error}
							</div>
						)}
						<p className="mb-0">
							Don't have an account?{" "}
							<Link to="/register" className="text-decoration-none">
								Register here
							</Link>
						</p>
					</div>
				</div>
			</div>
			<footer className="text-center mt-auto p-3">
				<hr />
				<p className="m-0">&copy; {new Date().getFullYear()} EduSync LMS</p>
			</footer>
		</div>
	);
};

export default Login;
