import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendMessage } from '../../api/api';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

function ChatInput({ headers, render, receiver  }) {
  const [chatMessage, setChatMessage] = useState('');

  //get parameter 
  const params = useParams();
  const { type, id } = params;

  //capitalize 
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  //message objects
  const messageObj = {
    receiver_id: parseInt(id),
    receiver_class: capitalizedType,
    body: chatMessage,
    headers
  }

  const handleMessage = (e) => {
    //prevent page reload
    e.preventDefault();

    //send message API
    sendMessage(messageObj)
      .then(res => {
        console.log(res)
        render()
      })
      .catch(err => err)
    
    //set chat input to blank
    setChatMessage('');
  }


  return (
    <ChatInputContainer>
      <form>
        <input
          onChange={(e) => setChatMessage(e.target.value)}
          placeholder={`Message ${receiver}`}
          onSubmit={handleMessage}
          value={chatMessage}
        />
        <Button
          type='submit'
          onClick={handleMessage}
        > 
          Send
        </Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  width: 100%;
  margin-left: 10px;
    
    >form {
      display: flex;
      justify-content: center;
    }

    >form >input {
      font-family: 'Noto Sans Display', sans-serif;
      font-size: 1rem;
      position: fixed;
      bottom: 2rem;
      width: 100%;
      max-width: 70%;
      border: 1px solid #868686;
      border-radius: 3px;
      padding: 1.5rem;
      outline: none;
    }

    >form >button {
      display: none;
    }

    @media (max-width: 1024px) {
      >form > input {
        max-width: 60%;
      }
    }
`;