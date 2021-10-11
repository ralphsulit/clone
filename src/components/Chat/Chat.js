import React, { useState, useEffect, useRef } from 'react';
import { getMessage, getUser, getChannelData } from '../../api/api';
import { useParams } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatBodyContainer from './ChatContainer';
import styled from 'styled-components';

function Chat({headers}) {
  //state
  const [chatData, setChatData] = useState('');
  const [receiver, setReceiver] = useState('');
  const [render, setRender] = useState(false);
  const chatRef = useRef(null);

  //parameter 
  const params = useParams();
  const { type, id } = params;

  //capitalize the first letter
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  //render
  const handleChatRender = () => {
    setRender(!render)
  }

  //smooth scrolling to bottom
  const scrollToBottomSmooth = () => {
    chatRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  //scroll to bottom on chat
  const scrollToBottom = () => {
    chatRef?.current?.scrollIntoView()
  }

  //message data
  const getMessageObj = {
    receiver_class: capitalizedType,
    receiver_id: parseInt(id),
    headers
  }

  const getDataObj = {
    id: parseInt(id),
    headers
  }

  useEffect(scrollToBottom, [chatData]);

  useEffect(() => {
    //get user message data
    getMessage(getMessageObj)
      .then(res => {
        setChatData(res.data.data)
      })
      .catch(err => console.log('Error Sending Message: ', err))
    
    if (type === 'user') {
      //get user data
      getUser(getDataObj)
        .then(res => {
          setReceiver(res[0].email) 
        })
    } else {
      //get channel data
      getChannelData(getDataObj)
        .then(res => {
          setReceiver(res.data.data.name)
        })
    }
    scrollToBottomSmooth();
  }, [id, render]);
  

  return (
    <ChatContainer>
      <ChatHeader
        receiver={receiver}
        headers={headers}
        render={handleChatRender}
      />
      <ChatMessages>
        <ChatBodyContainer chatData={chatData} chatRef={chatRef}/>
      </ChatMessages>
      <ChatInput headers={headers} render={handleChatRender} receiver={receiver} />
    </ChatContainer>
  )
}

export default Chat;

const ChatContainer = styled.div`
  width: 100%;
  flex: 0.7;
  flex-grow: 1;
  margin-top: 60px;
`;

const ChatMessages = styled.div`
  padding: 3rem;
  margin-bottom: 2rem;
`;