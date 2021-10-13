import axios from 'axios';

const axiosFetch = axios.create({
  baseURL: process.env.REACT_APP_SLACK_API_URL,
  headers: {
  'access-token': localStorage.getItem('access-token'),
  'client': localStorage.getItem('client'),
  'expiry': localStorage.getItem('expiry'),
  'uid': localStorage.getItem('uid')
  }
})

//user registration
export const userRegister = ({ email, password, password_confirmation }) => {
  return axiosFetch.post(`/api/v1/auth/`, {
    email,
    password,
    password_confirmation
  })
};

//login
export const userLogin = ({ email, password }) => {
  return axiosFetch.post(`/api/v1/auth/sign_in`, {
    email,
    password
  })
};

//Send Message 
export const sendMessage = ({
  receiver_id, receiver_class, body
}) => {
  return axiosFetch.post('/api/v1/messages',
    {
      receiver_id,
      receiver_class,
      body
    },)
};

//Get Messages
export const getMessage = ({
  receiver_class, receiver_id
}) => {
  return axiosFetch.get('/api/v1/messages',
    {
      params: {
        receiver_class,
        receiver_id
      }
    })
};

//Get All User Data
export const getAllUsers = () => {
  return axiosFetch.get(`http://206.189.91.54//api/v1/users`)
};

//Get user via id
export const getUser = () => {
  return axiosFetch.get('/api/v1/users')
};

//Get Channel
export const getChannel = () => {
  const options = {
    method: 'get',
    url: '/api/v1/channels'
  }
  return axiosFetch.request(options)
};

//Get Channel via ID
export const getChannelData = ({ id }) => {
  return axiosFetch.get(`http://206.189.91.54//api/v1/channels/${id}`)
};

//Get Recent Messages
export const getRecentDm = () => {
  return axiosFetch.get(`http://206.189.91.54//api/v1/users/recent/`)
};

//Get user owned channel
export const getOwnedChannel = () => {
  return axiosFetch.get(`http://206.189.91.54//api/v1/channel/owned`)
};

//Add a member to the channel
export const addMemberToTheChannel = ({ id, member_id }) => {
  return axiosFetch.post(`http://206.189.91.54//api/v1/channel/add_member`, 
  {
    id,
    member_id
  })
}

//Add channel
export const addChannel = ({ name, user_ids }) => {
  return axiosFetch.post('http://206.189.91.54//api/v1/channels',
  {
    name,
    user_ids
  })
}