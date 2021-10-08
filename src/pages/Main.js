import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Homepage from './Homepage';
import styled from 'styled-components';

function Home() {
  //state 

  return (
    <Router>
      <Header />
      <Body>
        <Sidebar />
        <Switch>
          <Route exact path='/homepage' component={Homepage}>
            <Homepage />
          </Route>
        </Switch>
      </Body>
    </Router>
  )
};

export default Home;

const Body = styled.div`
  display: flex;
  height: 100vh;
`;