import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getChannelData, getAllUsers, addMemberToTheChannel } from '../../api/api';
import styled from 'styled-components';

function ChatHeader({ receiver, headers }) {
  //state
  const [allUsers, setAllUsers] = useState([]);
  const [addUser, setAddUser] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const [channelMemberInfo, setChannelMemberInfo] = useState([]);
  const [toggleViewMembers, setToggleViewMembers] = useState(false);
  const [toggleAddMembers, setToggleAddMembers] = useState(false);


  //parameter
  const params = useParams();
  const { type, id } = params;

  //data obj
  const getDataObj = {
    id: parseInt(id),
    headers
  }

  //toggle view members
  const handleToggleViewMembers = () => {
    setToggleViewMembers(!toggleViewMembers)
  }

  // toggle add members
  const handleToggleAddMembers = () => {
    setToggleAddMembers(!toggleAddMembers)
  }

  //add member data into an array
  const handleAddMember = (data) => {
    setAddUser(data)
  }

  const handleAddedMember = () => {
    handleToggleAddMembers(false)
    addUser.map(user => {
      let members = {
        id: parseInt(id),
        member_id: user.id,
        headers
      }
      console.log(members)
    })
  }

  //member list
  const memberList = channelMemberInfo.map((user, i) => {
    return (
      <div key={i}>
        <p>{user.email}</p>
      </div>
    )
  }) 

  //get all user from api
  useEffect(() => {
    getAllUsers(headers)
      .then(res => { 
        setAllUsers(res.data.data)
        getChannelData(getDataObj)
          .then(res => {
            setChannelMembers(res.data.data.channel_members)
          })
          .catch(err => err)
      })
      .catch(err => err)
  }, [id])

  useEffect(() => {
    setChannelMemberInfo([])
    channelMembers.forEach(member => {
      const membersInfo = allUsers.find(user => user.id === member.user_id)
      setChannelMemberInfo(prev => [...prev, membersInfo])
    })
  }, [channelMembers])


  
  return (
    <ChatHeaderContainer>
      <HeaderLeft>
        <h2>
          <strong>{ type === 'channel' ? receiver : receiver }</strong>
        </h2>
      </HeaderLeft>
      {type === 'channel'
        ?
          <HeaderRight>
            <button onClick={handleToggleViewMembers}>Member List</button>
            <button onClick={handleToggleAddMembers}>Add Member</button>
          </HeaderRight>
        :
          ''
      }
      {toggleViewMembers
        ?
          <MemberList>
            {memberList}
          </MemberList>
        : ''
      }
      {toggleAddMembers
        ?
          <MemberList>
          </MemberList>
        :
          ''
      }
      
    </ChatHeaderContainer>
  )
};

export default ChatHeader;

const ChatHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  height: 56px;
  width: 100%;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  text-transform: lowercase;
  width: 72%;

    >h2 {
      font-family: 'Lato', sans-serif;
      font-size: 1.3rem;
    }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

    >button {
      cursor: pointer;
      font-family: 'Noto Sans Display', sans-serif;
      font-size: 0.8rem;
      margin: 10px;
      padding: 4px 10px;
      background-color: #fff;
      border: 1px solid #e1e1e1;
      outline: none;
      width: 100px;
    }
`;

const MemberList = styled.div`
  position: absolute;
  background: gray;
  height: 20rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
