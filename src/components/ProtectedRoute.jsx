import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, role }) => {
  // ✅ Retrieve user data safely
  let user = sessionStorage.getItem("user");
  user = user ? JSON.parse(user) : null;

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  // If a specific role is required, check if the user has that role
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />; // Redirect if role doesn't match
  }

  return element; // Allow access if authenticated and role matches
};

export default ProtectedRoute;


