import styled from 'styled-components';

const LoginContainer = styled.div`
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

const LoginInnerContainer = styled.div`
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
      height: 100px;
      margin-bottom: 10px;
      font-weight: 900;
    }

    >p {
      font-size: 0.8rem;
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

const SocialContainer = styled.div`
    margin-bottom: 20px;
`;

const Socials = styled.div`
    font-family: 'Noto Sans Display', sans-serif;
    font-size: 1rem;
    font-weight: 900;
    width: 350px;
    text-align: center;
    margin: 10px;
    border: 2px solid #1D1C1D;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
      &:first-child {
        color: #4285F4;
        border: 2px solid #4285F4;
      }

      >img {
        width: 45px;
        margin-right: 5px
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
      margin: 5px;
      width: 350px;
      outline: none;
      border: 1px solid rgb(186,186,186);
      border-radius: 4px;
    }

    >input[type=submit] {
      padding: 12px;
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

export { LoginContainer, LoginInnerContainer, Form, Socials, SocialContainer };