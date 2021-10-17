import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllUsers } from '../../api/api';
import styled from 'styled-components';
//icons
import ForumIcon from '@material-ui/icons/Forum';
import DescriptionIcon from '@material-ui/icons/Description';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

function SearchBox({ handleToggleSearchBox, handleToggleWarning }) {
  //state
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [allUser, setAllUser] = useState([]);


  //variables
  const searchBoxRef = useRef();

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

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchUser = allUser.filter(user => user.email.includes(search))
    setUsers(searchUser)  
  }

  const searchUserList = users.map((user, i) => {
    return (
      <LinkElement to={`/user/${user.id}`} onClick={handleToggleSearchBox} key={i}>
        <SearchBoxResults>
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
          <span onClick={handleToggleSearchBox}>X</span>
        </HeaderSearch>
        <SearchBoxResult>
          {searchUserList}
        </SearchBoxResult>
      </div>
      <Footer>
        <span onClick={handleToggleWarning}><ForumIcon fontSize='small' style={{ marginRight: '2px' }} />
          <p onClick={handleToggleSearchBox}>Messages</p>
        </span>
        <span onClick={handleToggleWarning}><DescriptionIcon fontSize='small' style={{marginRight: '2px'}}/><p onClick={handleToggleSearchBox}>Files</p></span>
        <span onClick={handleToggleWarning}><ListAltIcon fontSize='small' style={{marginRight: '2px'}}/><p onClick={handleToggleSearchBox}>Channels</p></span>
        <span onClick={handleToggleWarning}><SupervisedUserCircleIcon fontSize='small' style={{marginRight: '2px'}}/><p onClick={handleToggleSearchBox}>People</p></span>
      </Footer>
    </SearchBoxContainer>
  )
}

export default SearchBox;

//styled component
const Footer = styled.div`
  border-top: 1px solid #CECECE;
  padding-top: 10px;
  width: 100%;
  text-align: center;


    >span {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #E8F5FB;
      border-radius: 8px;
      font-weight: 500;
      padding: 5px 15px;
      margin: 0 10px;
      width: 110px;
    }

    >:first-child {
      margin-left: 0;
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
  height: 320px;
  margin-top: 10px;
  padding: 20px;
  z-index: 0  ;

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

    >span {
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
  z-index: 100;

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