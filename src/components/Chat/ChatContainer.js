import React from 'react';
import ChatBody from './ChatBody';
import styled from 'styled-components';

function ChatContainer({chatData, chatRef}) {
  return (
    <Container>

    </Container>
  )
};

export default ChatContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 42rem;
  width: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Bottom = styled.div`
  padding-bottom: 1px;
`;