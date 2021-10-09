import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function NewMessage() {
  

  return (
    <MessageContainer>
      <MessageHeader>
        <h2><strong>New Message</strong></h2>
      </MessageHeader>
      <MessageHeaderTo>
        <h1>To: </h1>
        <input type='text'/>
      </MessageHeaderTo>
    </MessageContainer>
  )
};

export default NewMessage;

const MessageContainer = styled.div`
  width: 100vw;
  flex: 0.7;
  flex-grow: 1;
  margin-top: 60px;
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;

    >h2 {
      font-size: 1.2rem;
    }
`;

const MessageHeaderTo = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid lightgray;

    >h1 {
      color: #808080;
      font-size: 1rem;
      font-weight: 500;
    }

    >input {
      width: 80%;
      background-color: transparent;
      border: none;
      padding-left: 2rem;
      color: black;
      outline: none;
      font-size: 1rem;

    >p {
      color: black;
      cursor: pointer;
    }
    }
`;

