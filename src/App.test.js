import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from './forms/Login/Login'
import { BrowserRouter } from 'react-router-dom';


it('renders Login with the button if it\'s not signed in', () => {
  render(<BrowserRouter><Login /></BrowserRouter>)
  const test = screen.getByText(/Sign In with Email/i)
  expect(test).toBeInTheDocument()
})

it ("Renders correctly", () => {
  const {queryByTestId, queryByPlaceholderText} = render(<BrowserRouter><Login /></BrowserRouter>)
  expect(queryByTestId("submit-btn")).toBeTruthy()
  expect(queryByPlaceholderText('Password', 'Email')).toBeTruthy()
})
