import React, { useState, useEffect, useRef } from 'react';
import { getMessage, getUser, getChannelData } from '../../api/api';
import { useParams } from 'react-router-dom';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatBodyContainer from './ChatContainer';
import styled from 'styled-components';

function Chat() {
  //state
  const [chatData, setChatData] = useState('');
  const [receiver, setReceiver] = useState('');
  const [render, setRender] = useState(false);
  const chatRef = useRef(null);

  const loginUserID = parseInt(localStorage.getItem('id'))

  //parameter 
  const params = useParams();
  const { type, id } = params;

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
  
  const userID = parseInt(id);

  useEffect(scrollToBottom, [chatData]);

  useEffect(() => {

    //capitalize the first letter
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

    //message data
    const getMessageObj = {
      receiver_class: capitalizedType,
      receiver_id: parseInt(id),
    }

    //get user message data
    getMessage(getMessageObj)
      .then(res => {
        setChatData(res.data.data)
      })
      .catch(err => console.log('Error Sending Message: ', err))
    
    if (type === 'user') {
      //get user data
      getUser()
        .then(res => {
          const userData = res.data.data.filter(data => data.id === userID)
          setReceiver(userData[0].email)
        })
    } else {
      //get channel data
      getChannelData(userID)
        .then(res => setReceiver(res.data.data.name))
    }
    scrollToBottomSmooth();
  }, [id, render]);

  return (
    <ChatContainer>
      <ChatHeader
        // headers={headers}
        receiver={receiver}
        render={handleChatRender}
      />
      <ChatMessages>
        { chatData.length > 0 ?
          <ChatBodyContainer chatData={chatData} chatRef={chatRef}/>
      : 
      <EmptyMessageStyle>
        {
          type === "user"
          ? loginUserID === userID
            ? <div> 
                <strong>This is your space.</strong> Draft messages, list your to-dos, or keep links and files handy. You can also talk to yourself here, but please bear in mind you’ll have to supply both sides of the conversation.
              </div>
            :
              <div>
                This is the very beginning of your direct message history with <EmailSpanStyle> {receiver}</EmailSpanStyle>. Only the two of you are in this conversation, and no one else can join it.
              </div>
          : <div>
              This is the very beginning of your direct message history in <EmailSpanStyle> {receiver} </EmailSpanStyle>. Only the members of this channel can see the messages.
            </div>
        }
            
      </EmptyMessageStyle>}
      </ChatMessages>
      <ChatInput render={handleChatRender} receiver={receiver} />
    </ChatContainer>
  )
}

export default Chat;

const ChatContainer = styled.div`
  width: 100vw;
  height: 95vh;
  margin-top: 45px;
  background-color: #F8F8F8;
`;

const ChatMessages = styled.div`
  padding: 3rem;
  margin-bottom: 2rem;
  z-index: -1;
`;

const EmptyMessageStyle = styled.div`
  display: flex;
  align-items: flex-end;
  height: 42rem;
  margin-left: 7.5%;
  color: gray;
`

const EmailSpanStyle = styled.span`
  color: #1264a3;
  background-color: #1d9bd11a;
  padding: 0 0.3rem 0 0.3rem;
`