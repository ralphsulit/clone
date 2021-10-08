import React from 'react';
import styled from 'styled-components';
import AvatarJC from "../assets/img/AvatarJC.jpg";
import AvatarJuju from "../assets/img/AvatarJuju.jpg";
import AvatarRalph from "../assets/img/AvatarRalph.jpg";

function Homepage() {
  return (
    <div>
      <Home>
        <HomeInner>
          <h1>Group 6 Slack App Clone</h1>
          <Header>
            <img src="https://avatars.slack-edge.com/2021-01-14/1620922289399_34e39fe253a871b90028_88.png" alt="Avion Logo" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1200px-Slack_icon_2019.svg.png" alt="Slack Logo" />
          </Header>
          <h1>Created By: </h1><br />
          <AvatarContainer>
            <JCarlo>
              <img src={AvatarJC} alt=""/>
              <h2>JC</h2>
            </JCarlo>
            <JulieV>
              <img src={AvatarJuju} alt=""/>
              <h2>Julie</h2>
            </JulieV>
            <RalphS>
              <img src={AvatarRalph} alt=""/>
              <h2>Ralph</h2>
            </RalphS>
          </AvatarContainer>
        </HomeInner>
      </Home>
    </div>
  )
};

export default Homepage;

const Home = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  flex: 0.7;
  flex-grow: 1;
  margin-top: 5%;
  margin-left: 40%;
  height: 70vh;
`;

const HomeInner = styled.div`
  display: flex;
  flex-direction; column;
  justify-content; flex-start;
  align-items: center;
  height: 80%;
  background-color: transparent;
  margin; auto;
  width: 45vw;

    >h1 {
      font-family: 'Montserrat', sans-serif;
    }
`;

const Header = styled.div`
    >img {
      height: 10vh;
      width: 10vw;
      margin: 5vh
    }
`;

const AvatarContainer = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-family: 'Montserrat', sans-serif;
  align-items: center;
  height: 80%;
    
    >img{
      height: 20rem;
      width: 20rem;
      margin: 1rem;
      border: 1px solid #000;
      border-radius: 30vh;
    }
`;

const JCarlo = styled.div`
  text-align: center;

    >img {
      height: 20rem;
      width: 20rem;
      margin: 1rem;
      border-radius: 30vh;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9), 0 1px 2px rgba(0, 0, 0, 0.75);

      :hover {
        opacity: 0.8;
      }
    }
`;

const JulieV = styled.div`
  text-align: center;

    >img {
      height: 20rem;
      width: 20rem;
      margin: 1rem;
      border-radius: 30vh;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9), 0 1px 2px rgba(0, 0, 0, 0.75);

      :hover {
        opacity: 0.8;
      }
    }
`;

const RalphS = styled.div`
  text-align: center;

    >img {
      height: 20rem;
      width: 20rem;
      margin: 1rem;
      border-radius: 30vh;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9), 0 1px 2px rgba(0, 0, 0, 0.75);

      :hover {
        opacity: 0.8
      }
    }
`;





