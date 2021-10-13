import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import AuthRoute from './AuthRoutes';
import UserRoute from './UserRoutes';
import Login from '../forms/Login/Login';
import Chat from '../components/Chat/Chat';
import Message from '../pages/MessagePage';

const Routes = () => {
  return (
    <Switch>
      <AuthRoute exact path='/' component={Login} />
      <UserRoute exact path='/:type/:id' component={Chat} />
      <UserRoute exact path='/message' component={Message} />  
    </Switch>
  )
}

export default Routes;