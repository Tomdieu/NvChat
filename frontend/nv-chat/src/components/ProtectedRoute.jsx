import { ROUTES } from "@constants/index";
import { useAuthContext } from "context/AuthContext";
import { Navigate,Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAllowed=false,
  redirectPath = ROUTES.LOGIN,
  children,
}) => {
  const {userToken} = useAuthContext()
  if (userToken===null) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
