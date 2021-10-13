import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllUsers } from '../../api/api';
import { headers } from '../../Headers';
import styled from 'styled-components';

function SearchBox({ handleToggleSearchBox }) {
  //state
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  //variables
  const searchBoxRef = useRef();

  useEffect(() => {
    const hideSearchBox = (e) => {
      if (searchBoxRef.current.contains(e.target)) return
      handleToggleSearchBox()
    }
      document.body.addEventListener('click', hideSearchBox, { capture: true })
    return () => {
      document.body.removeEventListener('click', hideSearchBox, {capture: true})
    }
  }, [])

  //get user data from api
  const viewAllUsers = () => {
    getAllUsers(headers)
      .then(res => {
        const userArray = res.data.data
        const resArray = userArray.filter(user => user.email.includes(search))
        setUsers(resArray)  
      })
      .catch(err => err)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    viewAllUsers()
  }

  const searchUserList = users.map((user, i) => {
    return (
      <LinkElement to={`/user/${user.id}`} onClick={handleToggleSearchBox}>
        <SearchBoxResults>
          <p key={i}>{user.email}</p>
        </SearchBoxResults>
      </LinkElement>
    )
  })

  return (
    <SearchBoxContainer>
      <div ref={searchBoxRef}>
        <HeaderSearch>
          <input type='text' placeholder='Search' onChange={handleSearch} />
          <p onClick={handleToggleSearchBox}>X</p>
        </HeaderSearch>
        <SearchBoxResult>
          {searchUserList}
        </SearchBoxResult>
      </div>
        <Footer>
          <p>Messages</p>   
          <p>Files</p>
          <p>Channels</p>
          <p>People</p>
        </Footer>
    </SearchBoxContainer>
  )
}

export default SearchBox;

//styled component
const Footer = styled.div`
  color: black;
  width: 100%;
  text-align: center;
  cursor: pointer;

    >p {
      background-color: #E8F5FB;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      padding: 5px 15px;
      margin: 0 10px;
      width: 100px;
    }
`;


const SearchBoxContainer = styled.div`
  background-color: #fff;
  border: 1px solid #CECECE;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  top: 0;
  left: 40%;
  width: 100%;
  max-width: 700px;
  height: 300px;
  margin-top: 10px;
  padding: 20px;
  z-index: 1;

    ${Footer} {
      color: black;
      display: flex;
      align-items: center;
      width: 100%;
    }
`;

const HeaderSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  width: 650px;

    >input {
      border: none;
      padding-bottom: 5px;
      width: 100%;
      outline: 0;
    }

    >p {
      color: black;
      cursor: pointer;
      font-family: 'Fredoka One', cursive;
    }
`;

const SearchBoxResult = styled.div`
  width: 100%;
  height: 200px;
  overflow-y: scroll;
  border-top: 1px solid #DDDDDD;
  z-index: 10;

    ::-webkit-scrollbar {
    display: none;
  }
`;


const SearchBoxResults = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-left: 3rem;
  cursor: pointer;
  background: white;

  > p {
    font-family: 'Noto Sans Display', sans-serif;
    font-size: 0.8rem;
    font-weight: bolder;
    padding-left: 1rem;
    letter-spacing: .2px;
    color: black;
  }

  :hover {
    background-color: #135999;

    > p {
      color: white;
    }
  }
`

const LinkElement = styled(NavLink)`
  text-decoration: none;
`;