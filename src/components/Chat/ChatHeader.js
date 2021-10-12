import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getChannelData, getAllUsers, addMemberToTheChannel } from '../../api/api';
import { headers } from '../../Headers';
import AddMember from '../Add/AddMember.js';
import styled from 'styled-components';
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import GroupAddIcon from '@material-ui/icons/GroupAdd';

function ChatHeader({ receiver }) {
  //state
  const [allUsers, setAllUsers] = useState([]);
  const [addUser, setAddUser] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const [channelMemberInfo, setChannelMemberInfo] = useState([]);
  const [toggleViewMembers, setToggleViewMembers] = useState(false);
  const [toggleAddMembers, setToggleAddMembers] = useState(false);
  const [render, setRender] = useState(false);

  //handle render
  const handleRender = () => {
    setRender(!render)
  }

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
      addMemberToTheChannel(members)
        .then(res => {
          handleRender()
        })
        .catch(err => err)
    })
  }

  //member list
  const memberList = channelMemberInfo.map((user, i) => {
    return (
      <div key={i}>
        <Member>    
          <p>{user.email.split('@')[0]}</p>
        </Member>
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
  }, [id, render])

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
          <PeopleAltIcon onClick={handleToggleViewMembers} fontSize='medium' />
          {channelMembers.length}
          </HeaderRight>
        :
          ''
      }
      {toggleViewMembers
        ?
          <MemberList>
              <HeaderLeft>
                <h2>
                  <strong>{ type === 'channel' ? receiver : receiver }</strong>
                </h2>
                <GroupAddIcon onClick={handleToggleAddMembers} />
              </HeaderLeft>
            {memberList}
          </MemberList>
        : ''
      }
      {toggleAddMembers
        ?
          <MemberList>
            <AddMember
              headers={headers}
              handleAddedMember={handleAddedMember}
              handleAddMember={handleAddMember}
            />
            <button onClick={handleAddedMember}>+</button>
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
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  height: 56px;
  width: 100%;
  padding: 0 6%;
  background-color: #fff;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  text-transform: lowercase;

    >h2 {
      font-family: 'Lato', sans-serif;
      font-size: 1.3rem;
    }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;

    >button {
      font-family: 'Noto Sans Display', sans-serif;
      font-size: 0.8rem;
      margin: 10px;
      padding: 4px 10px;
      background-color: #fff;
      border: 1px solid #e1e1e1;
      outline: none;
      width: 100px;
    }

    ${PeopleAltIcon} {
      color: #3F0E40;
      border: 1px solid #CDC3CD;
      border-radius: 5px;
      width: 50px;
      font-weight: 700;
      font-size: 0.8rem;
      padding: 2px 8px;
    }
`;

const MemberList = styled.div`
  font-family: 'Noto Sans Display', sans-serif;
  font-size: 1rem;
  position: absolute;
  background: #fff;
  border: 1px solid #c1c1c1;
  border-radius: 10px;
  padding: 30px;
  height: 20rem;
  width: 100%;
  height: 500px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 500px;
  margin-left: 500px;
    
    ${HeaderLeft} {
      color: red;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
    }
`;

const Member = styled.div`
  margin: 2px 0
`;
