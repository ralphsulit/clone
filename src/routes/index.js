import React from 'react';
import { Switch } from 'react-router-dom';
import AuthRoute from './AuthRoutes';
import UserRoute from './UserRoutes';
import Login from '../forms/Login/Login';
import Chat from '../components/Chat/Chat';
import Message from '../pages/MessagePage';
import Homepage from '../pages/Homepage';

const Routes = () => {
  return (
    <Switch>
      <AuthRoute exact path='/' component={Login} />
      <UserRoute exact path='/homepage' component={Homepage}/>
      <UserRoute exact path='/:type/:id' component={Chat} />
      <UserRoute exact path='/message' component={Message} />  
    </Switch>
  )
}

export default Routes;