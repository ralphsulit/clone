import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getChannelData } from '../../api/api';
import styled from 'styled-components';

function ChatHeader() {
  //state
  
  // return (
  //   <ChatHeaderContainer>
  //     <HeaderLeft>
  //       <h2>
  //         <strong>{ type === 'channel' ? receiver : receiver }</strong>
  //       </h2>
  //     </HeaderLeft>
  //     <HeaderRight>
  //       <button>Member List</button>
  //       <button>Add Member</button>
  //     </HeaderRight>
  //   </ChatHeaderContainer>
  // )
};

export default ChatHeader;

const ChatHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  text-transform: lowercase;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;

    >button {
      margin: 1vh;
    }
`;

const MemberList = styled.div`
  position: absolute;
  background: gray;
  height: 20rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
