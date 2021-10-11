import React, { useState } from 'react';
import { getAllUsers, getUser } from '../../api/api';
import styled from 'styled-components';

function AddMember({ headers, handleAddedMember, handleAddMember = null }) {
  //state
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [warning, setWarning] = useState(false);
  const [toggleSearchList, setToggleSearchList] = useState(false);
  const [click, setClick] = useState([]);

  //remove user
  const remove = (id) => {
    const list = click.filter(user => user.id !== id)
    setClick(list);
  }

  //selected user
  const clickedUser = (data) => {
    setSearch('')
    setToggleSearchList(false)

    //check if user is already in the array
    const check = [...click]
    const found = check.some(user => user.id === data.id)
    if (found) return setWarning(true)

    //
    const updatedArray = [...click, data]
    setWarning(false)
    setClick(updatedArray)

    //add array to chatHeader
    if (handleAddMember !== null) 
      handleAddMember(updatedArray)
  }

  //user data 
  const userSearchDetails = (id) => {
    //user obj from api
    const getUserObj = {
      id,
      headers
    }

    getAllUsers(getUserObj)
      .then(res => {
        clickedUser(res[0])
      })
      .catch(err => console.log(err))
  }

  const viewAllusers = () => {
    getAllUsers(headers)
      .then(res => {
        const userArray = res.data.data
        const resArray = userArray.filter(user => user.email.includes(search))
        setAllUsers(resArray)
      })
      .catch(err => err)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    viewAllusers()
  }
  
  const handleSearchList = () => {
    setToggleSearchList(!toggleSearchList);
  }

  const searchUser = allUsers.map((user, i) => {
    return (
      <LinkElement onClick={() => userSearchDetails(user.id)}>
        <SearchBoxResults key={i}>
          <p>{ user.email }</p>
        </SearchBoxResults>
      </LinkElement>
    )
  })

  const displayUser = click.map(user => {
    return (
      <div>
        <h3>{user.email}</h3>
        <p onClick={() => remove(user.id)}>x</p>
      </div>
    )
  })


  return (
    <Container>
      <HeaderSearch>
        <input
          type='text'
          placeholder='search'
          onChange={handleSearch}
          onClick={handleSearchList}
          value={search}
        />
        <p onClick={handleAddMember}>x</p>
        {warning ? <label>User is already added</label> : ''}
      </HeaderSearch>
      {toggleSearchList 
        ?
          <SearchBoxResult>
            {searchUser}
          </SearchBoxResult>
        : ''
      }
      <div>
        {displayUser}
      </div>
      <button onClick={handleAddedMember}>+</button>
    </Container>
  )
}

export default AddMember;

const Container = styled.div`
  
`

const HeaderSearch = styled.div`
  background-color: white;
  margin-top: 1rem;
  height: 3rem;
  width: 25rem;
  display: flex;
  padding-right: 1rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
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

const SearchBoxResult = styled.div`
  width: 26rem;
  max-height: 30rem;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 0.5rem;
`

const LinkElement = styled.div`
  text-decoration: none;
`

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
