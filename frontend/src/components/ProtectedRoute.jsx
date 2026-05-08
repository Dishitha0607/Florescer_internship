import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roleRequired }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // if not logged in
  if (!user) {
    return <Navigate to="/" />;
  }

  // wrong role
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" />;
  }

  // allow access
  return children;
}

export default ProtectedRoute;
