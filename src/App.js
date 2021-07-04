import React from 'react';
import { Counter } from './features/counter/Counter';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register' 
import Login from './Pages/Login/Login';

function App() {
  return (
    <Router>
      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
