import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Homepage from './Homepage';
import Message from './MessagePage'
import Chat from '../components/Chat/Chat';
import styled from 'styled-components';

function Home() {
  return (
    <Router>
      <Header />
      <Body>
        <Sidebar />
        <Switch>
          <Route path='/main' component={Homepage} />
          <Route path='/:type/:id' component={Chat} />
          <Route path='/message' component={Message} />
        </Switch>
      </Body>
    </Router>
  )
};

export default Home;

const Body = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;