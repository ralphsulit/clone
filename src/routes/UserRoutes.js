import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import styled from 'styled-components';

const UserRoute = ({component: Component, ...rest}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      {localStorage.getItem('access-token') && <Header/>} 
      <div style={{ display: 'flex', flexDirection: 'row'}}>
      {localStorage.getItem('access-token') && <Sidebar/>} 
      <Route
        {...rest}
        render={(props) => {
          if (localStorage.getItem('access-token')) {
            return < Component {...props} />
          } else {
            return <Redirect to={{
              pathname: '/',
              state: {
                from: props.location
              }
            }} />
          }
        }}
      />
      </div>
    </div>
  )
}

export default UserRoute;

