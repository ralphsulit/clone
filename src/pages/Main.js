import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import styled from 'styled-components';

function Home() {
  //state 

  return (
    <Router>
      <Header />
      <Body>
        <Sidebar />
      </Body>
    </Router>
  )
};

export default Home;

const Body = styled.div`
  display: flex;
  height: 100vh;
`;