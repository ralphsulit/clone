import React from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';
import { emailFormat, captalizedWord } from '../Utils/utils'

function ChatBody({ data }) {
  //variables
  const { body, created_at, sender: { id, email } } = data;

  return (
    <ChatBodyContainerStyle>
      <Image>
        <img src={ `https://picsum.photos/id/${id}/40` } alt='' />
      </Image>
      <ChatBodySubContainerStyle>
        <ChatDetailsStyle>
          <h3>{captalizedWord(emailFormat(email))}</h3>
          <label><Moment fromNow ago date={created_at}/> ago</label>
        </ChatDetailsStyle>
        <ChatBodyStyle>
          {body}
        </ChatBodyStyle>
      </ChatBodySubContainerStyle>
    </ChatBodyContainerStyle>
  )
};

export default ChatBody;

const ChatBodyContainerStyle = styled.div`
  display: flex;
  width: 100%;
`;

const Image = styled.div`
  width: 4rem;
  height: 4rem;
  overflow: hidden;

    >img {
      border-radius: 50%;
    }
`;

const ChatBodySubContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatDetailsStyle = styled.div`
  display: flex;
  flex-direction: row;

    >label {
      color: gray;
      font-size: 0.8rem;
      margin-left: 10px;
    }
`;

const ChatBodyStyle = styled.div`

`;