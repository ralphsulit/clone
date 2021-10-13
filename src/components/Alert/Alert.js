import React, { useEffect, useState } from 'react';
import styled from 'styled-components'; 
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

function Alert({handleToggleWarning}) {

  return (
      <Modal>
          <ModalContent>
          <ModalHeader>
            <h1>Oops!</h1>
          </ModalHeader>
          <ModalBody>
            <h1>This feature is not available yet</h1>
          </ModalBody>
          <ErrorOutlineIcon/>
          <button onClick={handleToggleWarning}>Okay</button>
        </ModalContent>
      </Modal>
  )
}
export default Alert;

const Modal = styled.div`
  color: black;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

const ModalContent = styled.div`
  width: 500px;
  background-color: #fff;
  height: 50vh;
  display: flex;
  flex-direction: column;
  border-radius: 20px;

  >.MuiSvgIcon-root {
    padding: 8px;
    color: rgb(161, 63, 63);
    font-size: 15rem;
    background-color: white;
    display: flex;
    text-align: center;
    margin: auto;
  }
  >button{
    width: 20%;
    margin: auto auto 20px;
    padding: 0.25vh;
    border-radius: 20px;
    border: green 1px solid;
    color: green;
  }
`;

const ModalHeader = styled.div`
  padding: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 3rem;
`;

const ModalBody = styled.div`
  text-align: center;
  padding: 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  font-size: 1rem;
`;
