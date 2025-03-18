import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PublicRoute = () => {
  const user = useSelector((store) => store.user.user);
  const isAdmin = user?.email === import.meta.env.VITE_ADMIN_EMAIL;
  console.log(user)
  console.log(isAdmin)
  if (isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
