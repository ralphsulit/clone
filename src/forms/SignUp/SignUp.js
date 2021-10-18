import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userRegister } from '../../api/api';
import { useHistory } from 'react-router-dom';
import { SignUpContainer, SignUpInnerContainer, Form } from './SignUp.style';
import styled from 'styled-components';

const SignUp = () => {
  //state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleRegister = (e) => {
    //prevent page reload
    e.preventDefault();
    
    //email data
    const data = {
      email,
      password,
      password_confirmation: password
    };

    //register API
    userRegister(data)
      .then(() => {
        history.push('/')
      })
      .catch(err => setError(`Username Already taken`))
  }

  return (
    <SignUpContainer>
      <SignUpInnerContainer>
        <img
          src="https://logos-world.net/wp-content/uploads/2020/10/Slack-Logo-2019-present.jpg"
          alt="slack logo" 
        />
        <h1>Sign up to Slack</h1>
        <Form>
        <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder='sample@email.com'
            type='email'
            title='email'
            />
        <input 
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            type='password'
            title='password'
        />
        <input
            onClick={handleRegister}
            type='submit'
            value={'Register'}
        />
        </Form>
        <ErrorStyle>{error ? error : ''}</ErrorStyle>
        <p>
          Already have an Account?
          <Link to='/'>Sign in</Link>
        </p>
      </SignUpInnerContainer>
    </SignUpContainer>
  )
};

export default SignUp;

const ErrorStyle = styled.div`
  color: red;
  font-size: 1rem;
  text-align: center;
`