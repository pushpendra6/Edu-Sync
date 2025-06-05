import { useState,useEffect,useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CourseUpload = () => {
	const [courseData, setCourseData] = useState({
		title: "",
		price: "",
		image: null,
	});
	const inputRef = useRef('');
	const fileInputRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState("");

	useEffect( () => {
		inputRef.current.focus();
	},[])
	

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setCourseData((prev) => ({ ...prev, image: file }));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		setTimeout(()=>{
			setIsLoading(false);
			toast.success("Course uploaded successfully!", { theme: "colored" });
			setShowPopup(true);
			setPopupType("upload");
		},2000);

	};


  const handlePopupConfirm = () => {
    setShowPopup(false);
    setCourseData({ title: "", price: ""});
	fileInputRef.current.value = null; // <-- clear file input

	inputRef.current.focus();
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
	navigate('/instructor-dashboard');
  };

	return (
				<div className="justify-content-center ">
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
				<div className="w-50 p-4 shadow col-12 col-md-6 col-lg-4 mt-5  ">
					<form onSubmit={handleSubmit}>
						<h2 className="text-center mb-4">Enter the New Course Details</h2>
						<div className="mb-3">
							<label htmlFor="title" className="form-label">
								Enter title of Course
							</label>
							<input
								type="text"
								className={`form-control`}
								id="title"
								name="text"
								ref={inputRef}
								value={courseData.title}
								onChange={(e)=>setCourseData(e.target.value)}
								placeholder="Enter course title"
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="price" className="form-label">
								Price
							</label>
							<input
								type="text"
								className={`form-control`}
								id="price"
								name="price"
								value={courseData.price}
								onChange={(e)=>setCourseData(e.target.value)}
								placeholder="Enter course price"
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="img" className="form-label">
								Image
							</label>
							<input
								type="file"
								className='form-control'
								id="img"
								name="img"
								ref={fileInputRef}
								accept="image/*"
								onChange={handleImageChange}
								required
							/>
						</div>
						<button type='submit' className="btn btn-primary w-100">
							{isLoading ? (
								<>
									<span
										className="spinner-border spinner-border-sm me-2"
										role="status"
										aria-hidden="true"
									></span>
									Uploading...
								</>
							) : (
								"Upload"
							)}</button>
					</form>
				</div>
			</div>
		{/* Popup Modal */}
      {showPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center">
          <div className="bg-white p-4 rounded shadow text-center">
            {popupType === "upload" && (
              <>
                <h4>Course is uploaded !</h4>
                <button className="btn btn-success m-2" onClick={handlePopupConfirm}>Add More Course</button>
                <button className="btn btn-secondary m-2" onClick={handlePopupCancel}>Home</button>
              </>
            )}
          </div>
        </div>
      )}

			<footer className="text-center mt-5 mb-3">
				<hr />
				<p>&copy; {new Date().getFullYear()} EduSync LMS</p>
				<p>About Us | Blog | Contact Us </p>
			</footer>
		</div>
	);
};

export default CourseUpload;