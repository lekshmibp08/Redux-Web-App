import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminPrivateRoute = ({ children }) => {
  const {isLoggedIn} = useSelector((state) => state.admin);
  console.log('Admin isLoggedIn:', isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/admin/sign-in" />;
};

export default AdminPrivateRoute;