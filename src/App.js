import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login';
import Otp from './Pages/Otp/Otp';
import Phone from './Pages/Phone/Phone';
import Service from './Pages/Service/Service';
import ServiceForm from './Pages/ServiceForm/ServiceForm';
import Success from './Pages/Success/Success';
import Transaction from './Pages/Transaction/Transaction';
import SocialOtp from './Pages/SocialOtp/SocialOtp';
import { selectUser, login, logout } from "./features/userSlice"
import { selectAdminUser, loginAdmin, logoutAdmin } from "./features/adminUserSlice"
import { useSelector, useDispatch } from "react-redux"
import LoadingModal from './Components/LodaingModal/LoadingModal'
import ServiceModal from './Components/ServiceModal/ServiceModal'
import Toaster from './Components/Toaster/Toaster'
import AdminLogin from './Pages/AdminLogin/AdminLogin'
import AdminResetPassword from './Pages/AdminResetPassword/AdminResetPassword'
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import AdminServiceDashboard from './Pages/AdminServiceDashboard/AdminServiceDashboard'
import AdminTestimonialDashboard from './Pages/AdminTestimonialDashboard/AdminTestimonialDashboard'
import AdminSubServiceDashboard from './Pages/AdminSubServiceDashboard/AdminSubServiceDashboard'
import AdminFormFieldDashboard from './Pages/AdminFormFieldDashboard/AdminFormFieldDashboard'
import AdminCityDashboard from './Pages/AdminCityDashboard/AdminCityDashboard'
import axios from "./axios"

function App() {

  const user = useSelector(selectUser)
  const adminUser = useSelector(selectAdminUser)
  const dispatch = useDispatch();
  const history = useHistory();
  let adminUserToken;
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
 
  let userToken;
  try {
    if (localStorage.getItem(window.btoa("token")) !== null) {
      userToken = window.atob(localStorage.getItem(window.btoa("token")));
      dispatch(login(userToken))
    }else{
      userToken = null;
    }

  }catch(e){
    userToken = null;
  }


  useEffect(async () => {

    try {
      if (localStorage.getItem(window.btoa("token")) !== null) {
        let userTokenCheck = window.atob(localStorage.getItem(window.btoa("token")));
        if (userTokenCheck !== null) {

          try {
            const config = {
              headers: { Authorization: `Bearer ${userTokenCheck}` }
            };
            const resp = await axios.get(`/api/user/check/`, config);
            if (resp.data.error) {
              dispatch(logout())
              localStorage.removeItem(window.btoa("token"));
              history.push("/")
            }
          } catch (err) {
            // Handle Error Here
            console.error(err);
            dispatch(logout())
            localStorage.removeItem(window.btoa("token"));
            history.push("/")
          }
            
        }

      }

    } catch (e) {
      console.log("user : "+ e)
      localStorage.clear();
      dispatch(logout())
    }



  }, [userToken]);

  useEffect(async () => {

    try {
      if (localStorage.getItem(window.btoa("admin_token")) !== null) {
        let adminUserTokenCheck = window.atob(localStorage.getItem(window.btoa("admin_token")));
        if (adminUserTokenCheck !== null) {

          try {
            const config = {
              headers: { Authorization: `Bearer ${adminUserTokenCheck}` }
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
      console.log("admin : "+ e)
      localStorage.clear();
      dispatch(logoutAdmin())
    }


  }, [dispatch,adminUserToken]);



  return (
    <Router>
      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/register" exact >
          {userToken !== null ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/login" exact >
          {userToken !== null ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/otp/:email" exact >
          {userToken !== null ? <Redirect to="/" /> : <Otp />}
        </Route>
        <Route path="/phone/:email" exact >
          {userToken !== null ? <Redirect to="/" /> : <Phone />}
        </Route>
        <Route path="/social/otp/:email" exact >
          {userToken !== null ? <Redirect to="/" /> : <SocialOtp />}
        </Route>
        <Route path="/service/:sub_service_id" exact >
          {/* {user !== null ? <Redirect to="/" /> : <Service />} */}
          <Service />
        </Route>
        <Route path="/service/form/:sub_service_id" exact >
          {/* {user !== null ? <Redirect to="/" /> : <Service />} */}
          <ServiceForm />
        </Route>
        <Route path="/success/form/:sub_service_id" exact >
          {/* {user !== null ? <Redirect to="/" /> : <Service />} */}
          <Success />
        </Route>
        <Route path="/transaction/form/:sub_service_id/:status" exact >
          {/* {user !== null ? <Redirect to="/" /> : <Service />} */}
          <Transaction />
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
        <Route path="/admin/service/:type/:city_id" exact >
          {adminUserToken === null ? <Redirect to="/admin" /> : <AdminServiceDashboard />}
        </Route>
        <Route path="/admin/sub-service/:type/" exact >
          {adminUserToken === null ? <Redirect to="/admin" /> : <AdminSubServiceDashboard />}
        </Route>
        <Route path="/admin/sub-service/:type/:sub_service_id" exact >
          {adminUserToken === null ? <Redirect to="/admin" /> : <AdminSubServiceDashboard />}
        </Route>
        <Route path="/admin/form-field/:type/" exact >
          {adminUserToken === null ? <Redirect to="/admin" /> : <AdminFormFieldDashboard />}
        </Route>
        <Route path="/admin/testimonial/:type" exact >
          {adminUserToken === null ? <Redirect to="/admin" /> : <AdminTestimonialDashboard />}
        </Route>
        <Route path="/admin/testimonial/:type/:id" exact >
          {adminUserToken === null ? <Redirect to="/admin" /> : <AdminTestimonialDashboard />}
        </Route>
        <Route path="/admin/city/" exact >
          {adminUserToken === null ? <Redirect to="/admin" /> : <AdminCityDashboard />}
        </Route>
        

      </Switch>

      <LoadingModal />
      <ServiceModal />
      <Toaster />
    </Router>
  );
}

export default App;
