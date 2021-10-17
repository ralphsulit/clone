import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getChannelData, getAllUsers, addMemberToTheChannel } from '../../api/api';
import AddMember from '../Channel/AddMember.js';
import { emailFormat, captalizedWord } from '../Utils/utils';
//styles
import styled from 'styled-components';
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CancelIcon from '@material-ui/icons/Cancel';
import './ChatHeader.css';

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
          <p>{captalizedWord(user.email)}</p>
        </Member>
      </div>
    )
  }) 

  //get all user from api
  useEffect(() => {
    getAllUsers()
      .then(res => { 
        setAllUsers(res.data.data)
        getChannelData(id)
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
          <strong>{ type === 'channel' ? captalizedWord(receiver) : emailFormat(receiver) }</strong>
        </h2>
      </HeaderLeft>
      {type === 'channel'
        ?
          <HeaderRight onClick={handleToggleViewMembers} >
            <PeopleAltIcon fontSize='medium' className="peopleIcon" />
            <h1>{channelMembers.length}</h1>
          </HeaderRight>
        :
          ''
      }
      {toggleViewMembers
        ?
          <div className='memberList'>
          <MemberList>
            <HeaderLeft>
              <h2>
                <strong>{ type === 'channel' ? receiver : receiver }</strong>
              </h2>
            <CancelIcon onClick={handleToggleViewMembers} style={{ cursor: 'pointer', color: '#cd5c5c'}}/>
            </HeaderLeft>
            <div className="members">
              <h4>Members</h4>
              <GroupAddIcon onClick={handleToggleAddMembers} style={{ cursor: 'pointer', color: '#606060'}} />
            </div>
            {memberList}
          </MemberList>
          </div>
        : ''
      }
      {toggleAddMembers
        ?
          <div className='memberList'>
            <AddMemberDiv>
              <AddMember
                receiver={receiver}
                handleAddedMember={handleAddedMember}
                handleAddMemberArray={handleAddMember}
                handleToggle={handleToggleAddMembers}
              />
              <button onClick={handleAddedMember}>Add</button>
            </AddMemberDiv>
          </div>
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
  z-index: 1;

    >h2 {
      font-family: 'Lato', sans-serif;
      font-size: 1.3rem;
    }
`;

const Image = styled.div`
  display: flex;
  margin-right: 10px;
  
    >img {
      border-radius: 50%;
      width: 30px;
      height: 30px;
      padding: auto;
    }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  border: 1px solid #CDC3CD;
  border-radius: 5px;
  padding: 3px 6px;

    >h1 {
      font-size: 0.8rem;
    }
`;

const MemberList = styled.div`
  font-family: 'Noto Sans Display', sans-serif;
  font-size: 1rem;
  background: #fff;
  border: 1px solid #c1c1c1;
  border-radius: 10px;
  padding: 30px;
  height: 500px;
  min-width: 500px;
  flex-direction: column;
  z-index: 20;

    ${HeaderLeft} {
      color: #000;
      margin-bottom: 20px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
`;

const Member = styled.div`
  margin: 2px 0
`;

const AddMemberDiv = styled.div`
position: relative;
background-color: #F5F5F5;
padding: 30px;
min-width: 500px;
height: 500px;
border-radius: 10px;
z-index: 21;

  >button{
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0 50px 30px 0;
  background-color: #350D36;
  border-radius: 5px;
  border: solid 1px transparent;
  color: white;
  padding: 1vh;
  font-weight:bolder;
  cursor: pointer;
  width: 10vh;
  }
`;