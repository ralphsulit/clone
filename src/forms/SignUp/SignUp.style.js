import styled from 'styled-components';

const SignUpContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Lato', sans-serif;
  font-size: 1.5rem;
  line-height: 46px;
  color: rgb(29, 28, 29);
`;

const SignUpInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  text-align: center:
  background-color: white;
  border-radius: 10px;
  width: 600px;
  margin-bottom: 60px;
    >img {
      object-fit: contain;
      height: 80px;
      margin-bottom: 10px;
    }

    >h1 {
      object-fit: contain;
      height: 100px;
      margin-bottom: 10px;
      font-weight: 900;
    }

    >p {
      font-size: 0.9rem;
      font-weight: 400;
      margin: 20px;
      height: 10px;

      >a {
        color: rgb(92,100,171);
        margin-left: 10px;
        text-decoration: none;
        font-weight: 600;
    }

  
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
    >input {
      color: rgb(97,96,97);
      font-family: 'Noto Sans Display', sans-serif;
      font-size: 1rem;
      padding: 12px;
      margin: 1vh;
      width: 350px;
      outline: none;
      border: 1px solid rgb(186,186,186);
      border-radius: 4px;
    }

    >input[type=submit] {
      padding: 12px;
      margin: 1vh;
      width: 350px;
      color: #fff;
      font-weight: bolder;
      background-color: #5d2d5d;
      font-family: 'Noto Sans', sans-serif;
      cursor: pointer;
      
        &:hover {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }
    }
`;

export { SignUpContainer, SignUpInnerContainer, Form };