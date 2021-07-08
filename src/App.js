import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register' 
import Login from './Pages/Login/Login';
import Otp from './Pages/Otp/Otp';
import { selectUser, login } from "./features/userSlice"
import { useSelector, useDispatch } from "react-redux"

function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(()=>{
    let user = localStorage.getItem("token");
    if(user!==null){
      dispatch(login(user))
    }
  });

  return (
    <Router>
      <Switch>

        <Route path="/" exact component={Home} />
        {/* <Route path="/register" exact component={()=>(<Register />)} /> */}
        <Route path="/register" exact >
          {user!==null ? <Redirect to="/" /> : <Register />}
        </Route>
        {/* <Route path="/login" exact component={Login} /> */}
        <Route path="/login" exact >
          {user!==null ? <Redirect to="/" /> : <Login />}
        </Route>
        {/* <Route path="/otp/:email" exact component={Otp} /> */}
        <Route path="/otp/:email" exact >
          {user!==null ? <Redirect to="/" /> : <Otp />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
