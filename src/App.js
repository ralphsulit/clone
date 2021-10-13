import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Homepage from './pages/Homepage';
import Message from './pages/MessagePage'
import Chat from './components/Chat/Chat';
import Login from './forms/Login/Login';
import Signup from './forms/SignUp/SignUp';
import styled from 'styled-components';


function App() {
  return (
    <Router>
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Signup} />
      {/* <Body>
        <Switch>
      
        </Switch>
      </Body> */}
    </Router>
  );
}

export default App;

const Body = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;