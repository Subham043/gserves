import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register' 
import Login from './Pages/Login/Login';
import Otp from './Pages/Otp/Otp';
import Phone from './Pages/Phone/Phone';
import SocialOtp from './Pages/SocialOtp/SocialOtp';
import { selectUser, login } from "./features/userSlice"
import { selectAdminUser, loginAdmin } from "./features/adminUserSlice"
import { useSelector, useDispatch } from "react-redux"
import LoadingModal from './Components/LodaingModal/LoadingModal'
import ServiceModal from './Components/ServiceModal/ServiceModal'
import AdminLogin from './Pages/AdminLogin/AdminLogin'
import AdminResetPassword from './Pages/AdminResetPassword/AdminResetPassword'
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import AdminServiceDashboard from './Pages/AdminServiceDashboard/AdminServiceDashboard'

function App() {

  const user = useSelector(selectUser)
  const adminUser = useSelector(selectAdminUser)
  const dispatch = useDispatch();

  useEffect(()=>{
    let user = localStorage.getItem("token");
    if(user!==null){
      dispatch(login(user))
    }
  }, [user]);

  useEffect(()=>{
    let adminUser = localStorage.getItem("admin_token");
    if(adminUser!==null){
      dispatch(loginAdmin(adminUser))
    }
  }, [adminUser]);

  return (
    <Router>
      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/register" exact >
          {user!==null ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/login" exact >
          {user!==null ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/otp/:email" exact >
          {user!==null ? <Redirect to="/" /> : <Otp />}
        </Route>
        <Route path="/phone/:email" exact >
          {user!==null ? <Redirect to="/" /> : <Phone />}
        </Route>
        <Route path="/social/otp/:email" exact >
          {user!==null ? <Redirect to="/" /> : <SocialOtp />}
        </Route>
        <Route path="/admin" exact >
          {adminUser===null ? <AdminLogin /> : <Redirect to="/admin/dashboard" />}
        </Route>
        <Route path="/admin/reset-password/:email" exact >
          {adminUser===null ? <AdminResetPassword /> : <Redirect to="/admin/dashboard" />}
        </Route>
        <Route path="/admin/dashboard" exact >
          {adminUser!==null ? <AdminDashboard /> : <Redirect to="/admin" />}
        </Route>
        <Route path="/admin/service/:type" exact >
          {adminUser!==null ? <AdminServiceDashboard /> : <Redirect to="/admin" />}
        </Route>
        
      </Switch>
      <LoadingModal />
      <ServiceModal />
    </Router>
  );
}

export default App;
