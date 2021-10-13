import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes'
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
axios.defaults.headers = {
  'access-token': localStorage.getItem('access-token'),
  'client': localStorage.getItem('client'),
  'expiry': localStorage.getItem('expiry'),
  'uid': localStorage.getItem('uid')
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
