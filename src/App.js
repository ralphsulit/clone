import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './forms/Login/Login';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
