import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NuraformLoader from "../pages/demo/NuraformLoader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <NuraformLoader />;
  }

  if (!user) {
    return <Navigate to="/demo" replace />;
  }

  return children;
};

export default ProtectedRoute;
