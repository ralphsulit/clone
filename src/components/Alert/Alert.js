import React from 'react';
import styled from 'styled-components';

function Alert() {
  //state
  // const [toggleAlert, setToggleAlert] = useState(false);

  //toggle alert
  // const handleToggleAlert = () => {
  //   setToggleAlert(!toggleAlert)
  // }

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          header
        </ModalHeader>
        <ModalBody>
          body
        </ModalBody>
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
`;

const ModalContent = styled.div`
  width: 500px;
  background-color: #fff;
`;

const ModalHeader = styled.div`
  padding: 10px;
`;

const ModalBody = styled.div`
  padding: 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

