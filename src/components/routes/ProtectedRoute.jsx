import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const ProtectedRoute = ({checkIsAdmin = false}) => {
  const user = useSelector((store) => store.user.user);
  const location = useLocation();
  let protectedConditions = true;
  if (!user) {
    protectedConditions = false;
  }
  if (checkIsAdmin) {
    const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL;
    protectedConditions = user && isAdmin;
  }
  if (checkIsAdmin) {
    return  <Navigate to="/unauthorized" />
  }
  return protectedConditions ? <Outlet /> : <Navigate to="/login" state={{from:location}} replace/>;
};
export default ProtectedRoute;
