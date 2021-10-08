import axios from 'axios';

const axiosFetch = axios.create({
  baseURL: process.env.REACT_APP_SLACK_API_URL
})

//user registration
export const userRegister = ({ email, password, password_confirmation }) => {
  return axiosFetch.post(`/api/v1/auth/`, {
    email,
    password,
    password_confirmation
  })
    .then(response => response)
    .then(result => result)
    .catch(err => err)
};

//login
export const userLogin = ({ email, password }) => {
  return axiosFetch.post(`/api/v1/auth/sign_in`, {
    email,
    password
  })
    .then(response => response)
    .then(result => result)
    .catch(err => err)
};

