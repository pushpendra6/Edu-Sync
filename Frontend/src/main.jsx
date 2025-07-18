import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./Redux/Store.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById("root")).render(
	// <StrictMode>
		<Provider store={store}>
			<ToastContainer />
			<App />
		</Provider>
	// </StrictMode>
);
