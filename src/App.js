import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login';
import Otp from './Pages/Otp/Otp';
import Phone from './Pages/Phone/Phone';
import Service from './Pages/Service/Service';
import SocialOtp from './Pages/SocialOtp/SocialOtp';
import { selectUser, login } from "./features/userSlice"
import { selectAdminUser, loginAdmin, logoutAdmin } from "./features/adminUserSlice"
import { useSelector, useDispatch } from "react-redux"
import LoadingModal from './Components/LodaingModal/LoadingModal'
import ServiceModal from './Components/ServiceModal/ServiceModal'
import Toaster from './Components/Toaster/Toaster'
import AdminLogin from './Pages/AdminLogin/AdminLogin'
import AdminResetPassword from './Pages/AdminResetPassword/AdminResetPassword'
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import AdminServiceDashboard from './Pages/AdminServiceDashboard/AdminServiceDashboard'
import AdminSubServiceDashboard from './Pages/AdminSubServiceDashboard/AdminSubServiceDashboard'
import AdminSubServiceFieldDashboard from './Pages/AdminSubServiceFieldDashboard/AdminSubServiceFieldDashboard'
import axios from "./axios"

function App() {

  const user = useSelector(selectUser)
  const adminUser = useSelector(selectAdminUser)
  const dispatch = useDispatch();
  const history = useHistory();
  let adminUserToken = null;
  try {
    if (localStorage.getItem(window.btoa("admin_token")) !== null) {
      adminUserToken = window.atob(localStorage.getItem(window.btoa("admin_token")));
      dispatch(loginAdmin(adminUserToken))
    }else{
      adminUserToken = null;
    }

  }catch(e){
    adminUserToken = null;
  }

  useEffect(() => {
    let user = localStorage.getItem("token");
    if (user !== null) {
      dispatch(login(user))
    }
  }, [user]);

  useEffect(async () => {

    try {
      if (localStorage.getItem(window.btoa("admin_token")) !== null) {
        let adminUserToken = window.atob(localStorage.getItem(window.btoa("admin_token")));
        if (adminUserToken !== null) {

          try {
            const config = {
              headers: { Authorization: `Bearer ${adminUserToken}` }
            };
            const resp = await axios.get(`/api/admin/check/`, config);
            if (resp.data.error) {
              dispatch(logoutAdmin())
              localStorage.removeItem(window.btoa("admin_token"));
              history.push("/admin")
            }
          } catch (err) {
            // Handle Error Here
            console.error(err);
            dispatch(logoutAdmin())
            localStorage.removeItem(window.btoa("admin_token"));
            history.push("/admin")
          }
            
        }

      }

    } catch (e) {
      localStorage.clear();
      dispatch(logoutAdmin())
    }

  }, []);



  return (
    <Router>
      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/register" exact >
          {user !== null ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/login" exact >
          {user !== null ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/otp/:email" exact >
          {user !== null ? <Redirect to="/" /> : <Otp />}
        </Route>
        <Route path="/phone/:email" exact >
          {user !== null ? <Redirect to="/" /> : <Phone />}
        </Route>
        <Route path="/social/otp/:email" exact >
          {user !== null ? <Redirect to="/" /> : <SocialOtp />}
        </Route>
        <Route path="/service/:sub_service_id" exact >
          {/* {user !== null ? <Redirect to="/" /> : <Service />} */}
          <Service />
        </Route>

        {/* admin */}
        <Route path="/admin" exact >
          {adminUserToken === null ? <AdminLogin /> : <Redirect to="/admin/dashboard" />}
        </Route>
        <Route path="/admin/reset-password/:email" exact >
          {adminUserToken === null ? <AdminResetPassword /> : <Redirect to="/admin/dashboard" />}
        </Route>
        <Route path="/admin/dashboard" exact >
          {adminUserToken === null ? <Redirect to="/admin" /> : <AdminDashboard />}
        </Route>
        <Route path="/admin/service/:type" exact >
          {adminUserToken === null ? <Redirect to="/admin" /> : <AdminServiceDashboard />}
        </Route>
        <Route path="/admin/service/:type/:service_id" exact >
          {adminUserToken === null ? <Redirect to="/admin" /> : <AdminServiceDashboard />}
        </Route>
        <Route path="/admin/sub-service/:type/" exact >
          {adminUserToken === null ? <Redirect to="/admin" /> : <AdminSubServiceDashboard />}
        </Route>
        <Route path="/admin/sub-service/:type/:sub_service_id" exact >
          {adminUserToken === null ? <Redirect to="/admin" /> : <AdminSubServiceDashboard />}
        </Route>
        <Route path="/admin/sub-service-field/:type" exact >
          {adminUserToken === null ? <Redirect to="/admin" /> : <AdminSubServiceFieldDashboard />}
        </Route>
        <Route path="/admin/sub-service-field/:type/:sub_service_id" exact >
          {adminUserToken === null ? <Redirect to="/admin" /> : <AdminSubServiceFieldDashboard />}
        </Route>

      </Switch>

      <LoadingModal />
      <ServiceModal />
      <Toaster />
    </Router>
  );
}

export default App;
