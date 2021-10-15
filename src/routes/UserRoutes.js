import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import './UserRoutes.css'

const UserRoute = ({component: Component, ...rest}) => {
  return (
    <div className='container'>
      {localStorage.getItem('access-token') && <Header/>} 
      <div className='innerContainer'>
      {localStorage.getItem('access-token') && <Sidebar/>} 
      <Route
        {...rest}
        render={(props) => {
          if (localStorage.getItem('access-token')) {
            return <Component {...props}/>
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

