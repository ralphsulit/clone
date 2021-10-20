import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllUsers } from '../api/api';
import { headers } from '../Headers';
import styled from 'styled-components';

function NewMessage() {
  //state
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState('');

  //function to view all users
  const viewAllUser = () => {
    getAllUsers(headers)
      .then(res => {
        const userArray = res.data.data
        const resArray = userArray.filter(user => user.email.includes(search))
        setAllUsers(resArray)
      })
      .catch(err => err)
  }

  //function to search
  const handleSearch = (e) => {
    setSearch(e.target.value)
    viewAllUser()
  }

  //list of all users
  const userList = allUsers.map((user, i) => {
    if(search.length > 0)
      return (
        <LinkElement key={i} to={`/user/${user.id}`}>
          <SearchBoxResult>
            <img src={ `https://robohash.org/${user.id}.png?size=40x40` }  alt=''/>
            <p>{user.email}</p>
          </SearchBoxResult>
        </LinkElement>
      )
  })

  return (
    <MessageContainer>
      <MessageHeader>
        <h2><strong>New Message</strong></h2>
      </MessageHeader>
      <MessageHeaderTo>
        <h1>To: </h1>
        <input type='text' onChange={handleSearch}/>
      </MessageHeaderTo>
      <SearchBox>
        {userList}
      </SearchBox>
    </MessageContainer>
  )
};

export default NewMessage;

const MessageContainer = styled.div`
  width: 100%;
  height: 95vh;
  margin-top: 40px;
  background-color: #F8F8F8;
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  background-color: #fff;

    >h2 {
      font-size: 1.2rem;
    }
`;

const MessageHeaderTo = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  background-color: #fff;

    >h1 {
      color: #808080;
      font-size: 1rem;
      font-weight: 500;
    }

    >input {
      width: 80%;
      background-color: transparent;
      border: none;
      padding-left: 2rem;
      color: black;
      outline: none;
      font-size: .9rem;
      font-weight: 700;

    >p {
      color: black;
      cursor: pointer;
    }
    }
`;

const LinkElement = styled(NavLink)`
  text-decoration: none;
`;

const SearchBox = styled.div`
  width: 95%;
  padding-left: 3rem;
  height: 200px;
  overflow-y: scroll;
  scrollbar-width: none;
  border: none;
  margin-top: 20px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const SearchBoxResult = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-left: 3rem;
  cursor: pointer;

    >p {
      font-size: .9rem;
      font-weight: 500;
      padding-left: 1rem;
      color: #000;
    }

    :hover {
      background-color: #135999;

      > p {
        color: #fff;
      }
    }
`;



