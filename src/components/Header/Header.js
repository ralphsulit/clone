import React, { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import styled from 'styled-components';
//icons
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

function Header() {
  //state
  const [toggleSearch, setToggleSearch] = useState(false);

  //toggle searchbox
  const handleToggleSearchBox = () => {
    setToggleSearch(!toggleSearch);
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
        <SearchIcon />
        <button>
          Search
        </button>
      </HeaderSearch>

      <HeaderRight>
        <HelpOutlineIcon/>
      </HeaderRight>

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
  background-color: var(--slack-color); 
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  padding: 10px 0;
  width: 100vw;
`;

const HeaderSearch = styled.div`
  border: 1px #808080 solid;
  border-radius: 6px;
  color: #808080;
  display: flex;
  flex; 0.4;
  padding: 0 50px;
  opacity: 1;
  text-align: center;

    >button {
      color: #fff;
      cursor: pointer;
      background-color: transparent;
      border: none;
      min-width: 30vw;
      outline: 0;
      text-align: center;
    }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex: 0.3;
  align-items: center;
  margin-left: 20px;

    >.MuiSvgIcon-root {
      margin-left: auto;
      margin-right: 30px;
    }
`;

const HeaderRight = styled.div`
  display: flex;
  flex: 0.3;
  align-items: flex-end;
    
    > .MuiSvgIcon-root {
      margin-left: auto;
      margin-right: 20px;
    }
`;

const Image = styled.div`
  overflow: hidden;

    >img {
      border-radius: 50%;
    }
`;