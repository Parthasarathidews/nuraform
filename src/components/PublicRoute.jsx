import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NuraformLoader from "../pages/demo/NuraformLoader";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <NuraformLoader />;
  }

  if (location.pathname === "/demo") {
    sessionStorage.removeItem("nuraform:show-form");
    sessionStorage.removeItem("nuraform:selected-form-id");
    sessionStorage.removeItem("nuraform:blank-form");
  }

  if (user) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

export default PublicRoute;
