import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import styled from 'styled-components';

function Home() {
  return (
    <Router>
      <Header />
    </Router>
  )
};

export default Home;