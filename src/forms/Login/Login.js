import React, { useState } from 'react';
import { userLogin } from '../../api/api';
import { Link, useHistory } from 'react-router-dom';
import { LoginContainer, LoginInnerContainer, Form, Socials, SocialContainer } from './Login.style';


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
            src='https://logos-world.net/wp-content/uploads/2020/10/Slack-Logo-2019-present.jpg?__cf_chl_jschl_tk__=pmd_negmFVFyODiA0I2tMwG44SR8xWfe__CJXlX6RYQv47A-1633913602-0-gqNtZGzNAnujcnBszQZl'
            alt="Slack Logo"
          />
          <h1>Sign in to Slack</h1>
          <SocialContainer>
            <Socials>
              Sign in with Google
            </Socials>
            <Socials>Sign in with Apple</Socials>
          </SocialContainer>
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