import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthProtectedRoute;
