import React from 'react'
<<<<<<< HEAD
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import Login from './forms/Login/Login';
import SignUp from './forms/SignUp/SignUp';
import Homepage from './pages/Homepage'
import userEvent from '@testing-library/user-event';


it(`renders Login with the button if it's not signed in`, () => {
=======
import { render, screen } from '@testing-library/react'
import Login from './forms/Login/Login'
import { BrowserRouter } from 'react-router-dom';


it('renders Login with the button if it\'s not signed in', () => {
>>>>>>> b369229db48886572033db48d35e54e25f559a93
  render(<BrowserRouter><Login /></BrowserRouter>)
  const test = screen.getByText(/Sign In with Email/i)
  expect(test).toBeInTheDocument()
})

it ("Renders correctly", () => {
  const {queryByTestId, queryByPlaceholderText} = render(<BrowserRouter><Login /></BrowserRouter>)
  expect(queryByTestId("submit-btn")).toBeTruthy()
  expect(queryByPlaceholderText('Password', 'Email')).toBeTruthy()
})
<<<<<<< HEAD

it(`Render Signup Button`, () => {
  render(<BrowserRouter><SignUp /></BrowserRouter>)
  const text = screen.getByText(/Register/i)
  expect(text).toBeInTheDocument()
})

test(`Redirect to Homepage when authenticated`, async () => {
  render(<BrowserRouter><Login/></BrowserRouter>);

  const email = screen.getByPlaceholderText('Email')
  fireEvent.change(email, { target: { value: 'username@gmail.com' } })
  
  const pass = screen.getByPlaceholderText('Password')
  fireEvent.change(pass, { target: { value: '123123' } })
  
  const submitBtn = screen.queryByTestId('submit-btn')
  userEvent.click(submitBtn)

  render(<BrowserRouter><Homepage/></BrowserRouter>)
  await screen.findByText('Group 6 Slack App Clone')
});



=======
>>>>>>> b369229db48886572033db48d35e54e25f559a93
