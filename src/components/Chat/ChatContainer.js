import React from 'react';
import ChatBody from './ChatBody';
import styled from 'styled-components';

function ChatContainer({chatData, chatRef}) {
  return (
    <Container>
      { chatData.length > 0
        ? chatData.map(data => <ChatBody key={data.id} data={data} />)
        : ''
      }
      <Bottom ref={chatRef}/>
    </Container>
  )
};

export default ChatContainer;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 42rem;
  overflow-y: scroll;

  > :first-child {
    margin-top: auto !important;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Bottom = styled.div`
  padding-bottom: 1px;
`;