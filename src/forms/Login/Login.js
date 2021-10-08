import React, { useState } from 'react';
import { LoginContainer, LoginInnerContainer, Form } from './Login.style';
import { Link, useHistory } from 'react-router-dom';
import { userLogin } from '../../api/api';

const Login = () => {
  return (
    <div>
      <LoginContainer>
        <LoginInnerContainer>
          <img
            src="https://logos-world.net/wp-content/uploads/2020/10/Slack-Logo-2019-present.jpg"
            alt="Slack Logo"
          />
          <h1>Sign In</h1>
          <Form>
            <input
              placeholder='Email'
              type='email'
              title='email'
            />
            <input
              placeholder='Password'
              type='password'
              title='password'
            />
            <input
              type='submit'
              value='Submit'

            />
          </Form>
        </LoginInnerContainer>
        <p>
          Not a User? <Link to=''>Register</Link>
        </p>
      </LoginContainer>
    </div>
  )
}

export default Login;