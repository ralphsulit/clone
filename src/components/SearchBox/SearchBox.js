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
      <LinkElement to={`/user${user.id}`} onClick={handleToggleSearchBox}>
        <SearchBoxResults key={i}>
          <p>{user.email}</p>
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
    </SearchBoxContainer>
  )
}

export default SearchBox;

//styled component
const SearchBoxContainer = styled.div`
  position: absolute;
  width: 60vw;
  height: 20rem;
  top: 1rem;
  left: 20rem;
  display: flex;
  padding-top: .5rem;
  align-items: flex-start;
  justify-content: center;
  overflow-y: hidden;
  
  > div {
    width: 60%;
    border-radius: .5rem;
  }
`;

const SearchBoxResult = styled.div`
  width: 100%;
  max-height: 30rem;
  overflow-y: scroll;
`;

const SearchBoxResults = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-left: 3rem;
  cursor: pointer;
  background: white;

  > p {
    font-size: 1rem;
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

const HeaderSearch = styled.div`
  background-color: white;
  height: 6vh;
  width: 83%;
  padding-left: 4rem;
  padding-right: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px gray solid;
  
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    color: black;
    outline: 0;
    font-weight: bolder;
    font-size: 1rem;
  }

  > p {
    color: black;
    cursor: pointer;
  }
`;

const LinkElement = styled(NavLink)`
  text-decoration: none;
`;