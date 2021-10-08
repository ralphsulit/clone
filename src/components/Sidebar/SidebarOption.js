import React from 'react';
import styled from 'styled-component';

function SidebarOption({icon, title, onClick}) {
  return (
    <SidebarOptionContainer onClick={onClick}>
      {icon && <icon fontSize='small' style={{ padding: '10' }} />}
      <h3>{title}</h3>
    </SidebarOptionContainer>
  )
};

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  padding-left: 2px;
  cursor: pointer;

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
`;