import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Protegge le rotte che richiedono autenticazione.
 * Se non c'è accessToken, reindirizza alla pagina di login.
 */
const ProtectedRoute = ({ children }) => {
  const { accessToken } = useAuth();

  return accessToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
