import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import PublicRoute from "./components/PublicRoute"
import AdminSignin from "./pages/AdminSignin"
import AdminDashboard from "./pages/AdminDashboard"

const App = () => {
  return (
    <BrowserRouter>
    < Header/>
    <Routes>

      <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
      </Route>      
      
      <Route path='/' element={ <Home /> } />
      <Route path='/about' element={ <About /> } />
      
      <Route element={ <PrivateRoute /> } >
        <Route path='/profile' element={ <Profile /> } />
      </Route>
      
      <Route path='/admin/sign-in' element={ <AdminSignin /> } />
      <Route path='/admin/dashboard' element={ <AdminDashboard /> } />
    </Routes>    
    </BrowserRouter>
  )
}

export default App
