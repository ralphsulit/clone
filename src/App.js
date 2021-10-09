import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './forms/Login/Login';
import SignUp from './forms/SignUp/SignUp';
import Main from './pages/Main';
import Homepage from '././pages/Homepage';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/register'>
            <SignUp />
          </Route>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/main'>
            <Main />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
