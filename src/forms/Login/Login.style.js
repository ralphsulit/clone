import styled from 'styled-components';

const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  text-align: center:
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 400px;
    >img {
      object-fit: contain;
      height: 100px;
      margin-bottom: 10px;
    }

    >h1 {
      object-fit: contain;
      height: 100px;
      margin-bottom: 10px;
    }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
    >input {
      padding: 1vh;
      margin: 1vh;
      min-width: 25vw;
    }

    >input[type=submit] {
      padding: 1vh;
      margin: 1vh;
      min-width: 25vw;
      color: #fff;
      font-weight: bolder;
      background-color: #5d2d5d;
      font-family: 'Noto Sans', sans-serif;
    }
`;

export { LoginContainer, LoginInnerContainer, Form };