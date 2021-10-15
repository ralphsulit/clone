import styled from 'styled-components';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

function Alert({ handleToggleWarning }) {
  return (
      <Modal>
        <ModalContent>
          <ModalHeader>
            <ErrorOutlineIcon/> 
            <h1>Warning</h1>
          </ModalHeader>
          <ModalBody>
            <h1>This feature is not yet available</h1>
          </ModalBody>
          <button onClick={handleToggleWarning}>Go Back</button>
        </ModalContent>
      </Modal>
  )
}
export default Alert;

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  color: black;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`

const ModalContent = styled.div`
  font-family: 'Fredoka One', cursive;
  width: 500px;
  border-top: 6px solid #FFD091;
  background-color: #fff;
  height: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 50px;

    >button{
      font-weight: 900;
      width: 100px;
      margin: 50px auto;
      padding: 10px 10px;
      border: none;
      border-radius: 5px;
      background: #350D36;
      color: #fff;
      cursor: pointer;
    }
`;

const ModalHeader = styled.div`
  text-transform: uppercase;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.9rem;

    >.MuiSvgIcon-root {
    color: #EFB796;
    font-size: 2.5rem;
    background-color: white;
    margin-right: 2px;
  }
`;

const ModalBody = styled.div`
  font-family: Noto Sans Display, 'sans-serif';
  text-align: center;
  padding: 10px;
  font-size: 0.5rem;
`;
