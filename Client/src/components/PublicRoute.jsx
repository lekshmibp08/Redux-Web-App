import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return !currentUser ? <Outlet /> : <Navigate to="/" replace />; 
};

export default PublicRoute;
