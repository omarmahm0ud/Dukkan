import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

function ProtectedRoute({ children }) {
  var { token } = useAuth();
  var location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default ProtectedRoute;
