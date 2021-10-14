import React, { useState, useEffect } from 'react';
import { getAllUsers, getUser } from '../../api/api';
import styled from 'styled-components';
import { headers } from '../../Headers';

function AddMember({ handleAddMemberArray, channelName="", handleToggle }) {
  //state
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [warning, setWarning] = useState(false);
  const [toggleSearchList, setToggleSearchList] = useState(false);
  const [click, setClick] = useState([]);

  useEffect(() => {
    // const hideSearchBox = (e) => {
    //   if (searchBoxRef.current.contains(e.target)) return
    //   handleToggleSearchBox()
    // }
    //   document.body.addEventListener('click', hideSearchBox, { capture: true })
    // return () => {
    //   document.body.removeEventListener('click', hideSearchBox, {capture: true})
    // }
    getAllUsers()
      .then(res => {
        setAllUser(res.data.data)
      })
      .catch(err => err)
  }, [])

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

    //Since state was previously empty, we need to add it to an array first
    const updatedUserArray = [...click, data]
    setWarning(false)
    setClick(updatedUserArray)

    //add array to chatHeader
    if (handleAddMemberArray !== null) {
      handleAddMemberArray(updatedUserArray)
    }
  }

  //user data 
  const userSearchDetails = (id) => {
    //user obj from api

    getUser()
      .then(res => {
        const dataID = res.data.data.filter(data => data.id === id)
        clickedUser(dataID[0])
        //console.log(dataID)
      })
      .catch(err => console.log(err))
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    const searchUser = allUser.filter(user => user.email.includes(search))
    setUsers(searchUser)
  }
  
  const handleSearchList = () => {
    setToggleSearchList(!toggleSearchList);
  }

  const searchUser = users.map((user, i) => {
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
      <p style={{color: 'black'}}>{channelName}</p>
      <HeaderSearch>
        <input
          type='text'
          placeholder='search'
          onChange={handleSearch}
          onClick={handleSearchList}
          value={search}
        />
        <p onClick={handleToggle}>x</p>
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
