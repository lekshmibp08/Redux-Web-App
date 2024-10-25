import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import AdminHeader from "./components/AdminHeader";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AdminSignin from "./pages/AdminSignin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTest from "./pages/AdminTest";

const App = () => {
  const location = useLocation();

  // Determine if the current path is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {isAdminRoute ? <AdminHeader /> : <Header />}
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route path='/admin/sign-in' element={<AdminSignin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

const WrapperApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrapperApp;
