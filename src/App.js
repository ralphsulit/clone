import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './forms/Login/Login';
import SignUp from './forms/SignUp/SignUp';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/register'>
            <SignUp />
          </Route>
          <Route exact path='/'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
