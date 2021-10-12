import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';
import styled from 'styled-components';
//icons
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Header() {
  //state
  const [toggleSearch, setToggleSearch] = useState(false);
  
  //variables
  const history = useHistory();

  //toggle searchbox
  const handleToggleSearchBox = () => {
    setToggleSearch(!toggleSearch);
  }

  //logout
  const handleLogout = () => {
    history.push('/')
    localStorage.clear()
  }

  return (
    <HeaderContainer>
      <HeaderLeft>
        <Image>
          <img
            src=""
            alt=""
          />
        </Image>
        <AccessTimeIcon/>
      </HeaderLeft>
      
      <HeaderSearch>
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
        <SearchBox
          handleToggleSearchBox={handleToggleSearchBox}
        />
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
`;

const HeaderSearch = styled.div`
  border: 1px #808080 solid;
  border-radius: 6px;
  background-color: #644565;
  color: #808080;
  display: flex;
  padding: 0 50px;
  opacity: 1;
  margin: 0 20px;
  font-family: 'Noto Sans Display', sans-serif;

    >button {
      color: #fff;
      cursor: pointer;
      background-color: #644565;
      border: none;
      min-width: 30vw;
      outline: 0;
      text-align: left;
      font-family: 'Noto Sans Display', sans-serif;
    }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

    >.MuiSvgIcon-root {
    }
`;

const HeaderRight = styled.div`
  display: flex;
    
    > .MuiSvgIcon-root {
      margin-right: 20px;
    }
`;

const Image = styled.div`
  overflow: hidden;

    >img {
      border-radius: 50%;
    }
`;

const Logout = styled.div`
  display: flex;
  margin-left: 100px;
`;

