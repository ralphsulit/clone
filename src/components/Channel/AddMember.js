import React, { useState } from 'react';
import { getAllUsers, getUser } from '../../api/api';
import styled from 'styled-components';
import { headers } from '../../Headers';

function AddMember({handleAddMember, channelName="" }) {
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

  // Since state was previously empty, we need to add it to an array first
    const updatedArray = [...click, data]
    setWarning(false)
    setClick(updatedArray)

    //add array to chatHeader
    if (handleAddMember !== null) {
      handleAddMember(updatedArray)
    }
  }

  //user data 
  const userSearchDetails = (id) => {
    //user obj from api
    const getUserObj = {
      id,
      headers
    }

    getUser(getUserObj)
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
      <LinkElement onClick={() => userSearchDetails(user.id)} key={i}>
        <SearchBoxResults>
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
      <h1>Add people</h1>
      <p>#{channelName}</p>
      <Search>
        <input
          type='text'
          placeholder='search'
          onChange={handleSearch}
          onClick={handleSearchList}
          value={search}
        />
        <p onClick={handleAddMember}>x</p>
        
      </Search>
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
      {warning ? <label>User is already added</label> : ''}
    </Container>
  )
}

export default AddMember;

const Container = styled.div`
  >h1{
    margin-top: 2vh;
    text-align: left;
    margin-left: 2vw;
  }
  >p{
    margin-top: 0.5vh;
    text-align: left;
    margin-left: 2vw;
    color: #4e4e4e;
  }
`

const Search = styled.div`
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
