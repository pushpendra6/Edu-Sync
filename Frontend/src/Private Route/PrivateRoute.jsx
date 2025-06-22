import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user); // check Redux auth

  if (!user.name) {
    return <Navigate to="/login" />;
  }

  // ✅ Logged in
  return children;
};

export default PrivateRoute;
