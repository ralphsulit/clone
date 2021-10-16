import React, { useState, useEffect } from 'react';
import { getAllUsers, getUser } from '../../api/api';
import styled from 'styled-components';
import CancelIcon from '@material-ui/icons/Cancel';

function AddMember({
  handleAddMemberArray,
  channelName = "",
  handleToggle,
  receiver
})
{
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

    console.log('add member clicked')
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
      <LinkElement key={i} onClick={() => userSearchDetails(user.id)}>
        <SearchBoxResults>
          <p>{ user.email }</p>
        </SearchBoxResults>
      </LinkElement>
    )
  })

  const displayUser = click.map((user, i) => {
    return (
      <section key={i}>
        <h3>{user.email}</h3>
        <span onClick={() => remove(user.id)}>X</span>
      </section>
    )
  })


  return (
    <Container>
      <CancelIcon onClick={ handleToggle }/>
      <h1>Add people</h1>
      <p>#{channelName}{receiver}</p>
      <Search>
      {warning ? <label>User is already added</label> : ''}
        <input
          type='text'
          placeholder='search'
          onChange={handleSearch}
          onClick={handleSearchList}
          value={search}
          />
      </Search>
      {toggleSearchList 
        ?
        <SearchBoxResult>
            {searchUser}
          </SearchBoxResult>
        : ''
      }
      <DisplayUser>
        {displayUser}
      </DisplayUser>
      
    </Container>
  )
}

export default AddMember;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
    > h1{
      font-family: 'Noto Sans Display', sans-serif;
      margin-top: 2vh;
      text-align: left;
      margin-left: 2vw;
      font-size: 2rem;
    }

    >p {
        margin-top: 0.5vh;
        text-align: left;
        margin-left: 2vw;
        color: #4e4e4e;
    }

    .MuiSvgIcon-root {
      margin-top: 1vh;
      margin-right: 2px;
      margin-left:90%;
      color: #cd5c5c;
      cursor: pointer;
    }
`;


const Search = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1vh 2vw;
  text-align: center;
  justify-content: center;

  
  > input {
    background-color: white;
    border: 1.5px solid #c5c5c5;
    text-align: left;
    color: black;
    outline: 0;
    font-weight: 1;
    font-size: 1rem;
    width: 100%;
    padding: 1vh;
    border-radius: 10px;
  }
`;

const SearchBoxResult = styled.div`
  max-height: 10rem;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 1px;  
  width: 23.2rem;  
  margin-left: 2vw;
  z-index: 30;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const LinkElement = styled.div`
  text-decoration: none;
`;

const SearchBoxResults = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-left: .5rem;
  cursor: pointer;
  background: white;
  
  > p {
    font-size: 1rem;
    font-weight: 1;
    padding-left: 1rem;;
    color: black;
  }

  :hover {
    background-color: var(--slack-color);

    > p {
      color: white;
    }
  }
`;

const DisplayUser = styled.div`
  position: absolute;
  top: 13rem;
  left: 5rem;
  background-color: transparent;
  scrollbar-color: transparent;
  height: 11rem;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 70%;
  margin: 20px auto;

    ::-webkit-scrollbar {
        display: none;
      }

    >section {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    >section > h3 {
      font-weight: normal;
      color: #5a5a5a;
    }

    >section > span {
      display: flex;
      align-items: center;
      font-family: 'Fredoka One', cursive;
      font-size: 1rem;
      cursor: pointer;
    }
`;
