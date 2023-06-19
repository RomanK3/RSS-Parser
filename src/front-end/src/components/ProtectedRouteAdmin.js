import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

const ProtectedRouteAdmin = ({ redirectPath = "/" }) => {
  const auth = useAuth();

  if (!auth.token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteAdmin;
