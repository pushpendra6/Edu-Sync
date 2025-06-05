import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {setUser} from '../Redux/userSlice'

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
    useEffect( () => {
			inputRef.current.focus();
	},[])

	const handleRegister = async (e) => {
		e.preventDefault();

		if (!formData.name &&!formData.email && !formData.role && !formData.password &&!formData.confirmPassword){
			    toast.error("All fields are required!",{ theme: "colored"});
			return;
		}
		if(formData.password !== formData.confirmPassword){
			toast.error("Passwords do not match!", { theme: "colored" });
			return;	
		}
		const { confirmPassword, ...registerData } = formData;
		console.log(confirmPassword);
		try {
			const response = await fetch("http://localhost:5000/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(registerData),
			});

			const data = await response.json();
			if (!response.ok) {
				toast.error(data.message, { theme: "colored" });
				return;
			}

			dispatch(setUser({ name: formData.name, role: formData.role }));

			toast.success("Registration successful!", { theme: "colored" });
			if ((formData.role).toLowerCase === "student") {
			    toast.success(data.message, {theme: "colored" });
			    navigate("/student-dashboard");
		    }else{
			    toast.success("Instructir Login Successfully!!", {theme: "colored"});
			    navigate("/instructor-dashboard");
		    } 
		} catch (err) {
			toast.error("Registration failed. Please try again.", { theme: "colored" });
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	}
		return (
			<div className="justify-content-center">
				{/* Navbar */}
				<header className="navnavbar navbar-expand-lg bg-primary px-3">
					<nav className="navbar justify-content-center">
						<Link
							to="/"
							className=" fw-bold fs-1 m-2 p-2 text-white text-decoration-none"
						>
							EduSync
						</Link>
					</nav>
				</header>
				{/* Login Form */}
				<div className="align-items-center d-flex flex-column mb-5">
					<div className="card p-4 shadow col-12 col-md-6 col-lg-4 mt-5  ">
						<form onSubmit={handleRegister}>
							<div className="mb-3">
								<label htmlFor="name" className="form-label">
									Full Name
								</label>
								<input
									type="text"
									className={`form-control`}
									id="name"
									name="name"
									ref={inputRef}
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									placeholder="Enter your full name"
									required
									disabled={isLoading}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">
									Email address
								</label>
								<input
									type="email"
									className={`form-control`}
									id="email"
									name="email"
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
									className={`form-control`}
									id="password"
									name="password"
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									placeholder="Enter your password"
									required
									disabled={isLoading}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="confirmPassword" className="form-label">
									Confirm Password
								</label>
								<input
									type="password"
									className={`form-control`}
									id="confirmPassword"
									name="confirmPassword"
									value={formData.confirmPassword}
									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
									placeholder="Confirm your password"
									required
									disabled={isLoading}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="role" className="form-label">
									Role
								</label>
								<select
									className="form-select"
									id="role"
									name="role"
									value={formData.role}
									onChange={(e) => setFormData({ ...formData, role: e.target.value })}
									required
									disabled={isLoading}
								>
									<option value="">Choose</option>
									<option value="Student">Student</option>
									<option value="Instructor">Instructor</option>
								</select>
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
										Registering...
									</>
								) : (
									"Register"
								)}
							</button>
						</form>
						<div className="text-center mt-3">
							<p className="mb-0">
								Already have an account?{" "}
								<Link to="/login" className="text-decoration-none">
									Login here
								</Link>
							</p>
						</div>
					</div>
				</div>
				<footer className="text-center p-3 ">
						<hr />
						<p className="m-5">
							&copy; {new Date().getFullYear()} EduSync LMS
						</p>
				</footer>
			</div>
		);
	};

export default Register;
