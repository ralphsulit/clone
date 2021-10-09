import React, { useState } from 'react';
import { LoginContainer, LoginInnerContainer, Form } from './Login.style';
import './Login.style';
import { Link, useHistory } from 'react-router-dom';
import { userLogin } from '../../api/api';

const Login = () => {
  //state
  const [email, setEmail] = useState('ralph@gmail.com');
  const [password, setPassword] = useState('123123');
  const history = useHistory();
  
  const handleLogin = (e) => {
    //to prevent page reload
    e.preventDefault()

    //email and password 
    const data = { email, password }

    //User login API
    userLogin(data)
      .then(res => {
        localStorage.setItem('access-token', res.headers['access-token']);
        localStorage.setItem('client', res.headers['client']);
        localStorage.setItem('expiry', res.headers['expiry']);
        localStorage.setItem('uid', res.headers['uid']);
        history.push('/main');
      })
      .catch(err => err)
  } 

  return (
    <div>
      <LoginContainer className='container'>
        <LoginInnerContainer>
            <img
              src="https://logos-world.net/wp-content/uploads/2020/10/Slack-Logo-2019-present.jpg"
              alt="Slack Logo"
            />
          <h1>Sign in to Slack</h1>
          <Form>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder='Email'
              type='email'
              title='email'
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder='Password'
              type='password'
              title='password'
            />
            <input
              type='submit'
              value='Sign In with Email'
              onClick={handleLogin}
            />
          </Form>
          <p>
            New to Slack?
            <Link to='/register'>Create an account</Link>
          </p>
        </LoginInnerContainer>
      </LoginContainer>
    </div>
  )
}

export default Login;