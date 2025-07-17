import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { accessToken, user } = useAuth();

  if (!accessToken) return <Navigate to="/login" replace />;
  if (user?.role !== "ROLE_ADMIN") return <Navigate to="/home" />;

  return children;
};

export default AdminRoute;
