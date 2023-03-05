import { ROUTES } from "constants/index";
import { useAuthContext } from "context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userToken } = useAuthContext();
  const { search } = useLocation();
  const loginUrl =
    search === "" ? ROUTES.LOGIN : ROUTES.LOGIN + "?next=" + search;
  console.log(loginUrl);
  if (userToken === null) {
    return <Navigate to={loginUrl} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
