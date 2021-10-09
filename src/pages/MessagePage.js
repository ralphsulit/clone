import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllUsers } from '../api/api';
import styled from 'styled-components';

function NewMessage({headers}) {
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
    return (
      <LinkElement to={`/user/${user.id}`}>
        <SearchBoxResult key={i}>
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
  width: 100vw;
  flex: 0.7;
  flex-grow: 1;
  margin-top: 60px;
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;

    >h2 {
      font-size: 1.2rem;
    }
`;

const MessageHeaderTo = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid lightgray;

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
  border-radius: 20px;
  margin-top: 20px;
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



