import React from 'react';
import styled from 'styled-components';

function SidebarOption({Icon, title, onClick, 
  addChannelICon=false, handleToggleAddChannel}) {
  return (
    <SidebarOptionContainer 
      onClick={onClick}>
      {Icon && <Icon fontSize='large' style={{ padding: '10' }} />}
      <h3>{title}</h3>
      {addChannelICon && 
        <span onClick={handleToggleAddChannel}>+</span>}
    </SidebarOptionContainer>
  )
};

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 2px;
  cursor: pointer;
  color: #BCABBC;

    >h3 {
      font-weight: 500;
    }

    >h3 > span {
      padding: 15px;
    }

    :hover {
      background-color: #340e36;
      opacity: 0.8;
    }

    > span {
      left: 13rem;

      z_index: 2;

      :hover {
        color: red;
        background-color: blue;
      }
    }
`;