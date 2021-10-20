import React, { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Alert from '../Alert/Alert';
//icons and styles
import './Header.css'
import styled from 'styled-components';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';

function Header({handleToggleSidebar}) {
  //state
  const [toggleSearch, setToggleSearch] = useState(false);
  const [warning, setWarning] = useState(false);

  //toggle warning
  const handleToggleWarning = () => {
    setWarning(!warning);
  }


  //toggle searchbox
  const handleToggleSearchBox = () => {
    setToggleSearch(!toggleSearch);
  }

  //logout
  const handleLogout = () => {
    window.location = '/'
    localStorage.clear()
  }

  return (
    <HeaderContainer className='header'>
      {warning ? <Alert handleToggleWarning={handleToggleWarning} /> : null}
      <MenuIcon className='menu-icon' onClick={handleToggleSidebar}/>
      <HeaderLeft>
        <AccessTimeIcon/>
      </HeaderLeft>
      
      <HeaderSearch onClick={handleToggleSearchBox} style={{cursor: 'pointer'}}>
        <button>
          Search
        </button>
        <SearchIcon />
      </HeaderSearch>

      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
      <Logout>
        <ExitToAppIcon onClick={handleLogout} style={{ cursor: 'pointer'}}/>
      </Logout>

      {toggleSearch ? (
        <SearchBox handleToggleSearchBox={handleToggleSearchBox} handleToggleWarning={handleToggleWarning}/>
      ) : null}
    </HeaderContainer>
  )
};

export default Header;

//Styled Component
const HeaderContainer = styled.div`
  background-color: rgb(53,13,54); 
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  padding: 10px 0;
  width: 100%;
  font-family: 'Noto Sans Display', sans-serif;
  padding-left: 450px;
  height: 5vh;
  z-index: 20;
`;

const HeaderSearch = styled.div`
  border: 1px #808080 solid;
  border-radius: 6px;
  background-color: #644565;
  color: #808080;
  display: flex;
  justify-content: space-between;
  opacity: 1;
  margin: 0 20px;
  font-family: 'Noto Sans Display', sans-serif;
  width: 500px;
  padding: 0 10px;

    >button {
      color: #fff;
      cursor: pointer;
      background-color: #644565;
      border: none;
      outline: 0;
      text-align: left;
      font-family: 'Noto Sans Display', sans-serif;
    }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
`;

const Logout = styled.div`
  display: flex;
  margin-left: 100px;
`;

