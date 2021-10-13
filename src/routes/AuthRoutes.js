import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem('access-token')) {
          return < Component {...props} />
        } else {
          return <Redirect to={{
            pathname: '/message',
            state: {
              from: props.location
            }
          }} />
        }
      }}
    />
  )
}

export default AuthRoute;