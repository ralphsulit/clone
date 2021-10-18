import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getChannelData, getAllUsers, addMemberToTheChannel } from '../../api/api';
import AddMember from '../Channel/AddMember.js';
import Alert from '../Alert/Alert';
import { emailFormat, captalizedWord } from '../Utils/utils';
//styles
import styled from 'styled-components';
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CancelIcon from '@material-ui/icons/Cancel';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import './ChatHeader.css';

function ChatHeader({ receiver }) {
  //state
  const [allUsers, setAllUsers] = useState([]);
  const [addUser, setAddUser] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const [channelMemberInfo, setChannelMemberInfo] = useState([]);
  const [toggleViewMembers, setToggleViewMembers] = useState(false);
  const [toggleAddMembers, setToggleAddMembers] = useState(false);
  const [toggleWarning, setToggleWarning] = useState(false);
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

  const handleToggleWarning = () => {
    setToggleWarning(!toggleWarning)
  }

  const handleAddedMember = () => {
    handleToggleAddMembers(false)
    addUser.forEach(user => {
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
          <img src={ `https://robohash.org/${user.id}.png?size=40x40` }  alt=''/>
          <h3>{captalizedWord(user.email)}</h3>
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
            <Span>
              {toggleWarning ? <Alert handleToggleWarning={handleToggleWarning} /> : null} 
              <Star onClick={handleToggleWarning}>
                <StarBorderIcon fontSize='small' />
                <KeyboardArrowDownIcon fontSize='small'/>
              </Star>
              <Bell onClick={handleToggleWarning}>
                <NotificationsNoneIcon fontSize='small' />
                Enable Notifications
              </Bell>
              <Call onClick={handleToggleWarning}>
                <LocalPhoneIcon fontSize='small' />
                Start a Call
              </Call>
            </Span>
            <div className="members">
              <h4>Members</h4>
              <GroupAddIcon onClick={handleToggleAddMembers} style={{ cursor: 'pointer', color: '#606060'}} />
            </div>
            <MembersContainer>
              {memberList}
            </MembersContainer>
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

const Span = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Star = styled.div`
  margin: 15px 0;
  border: 1px solid #BABABA;
  border-radius: 3px;
  width: 50px;
  padding: 2px 8px 2px 3px;
  display: flex;
  align-items: center;
  cursor: pointer;

    >.MuiSvgIcon-root {
      color: #5F5F5F;
    }
`;

const Bell = styled.div`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #BABABA;
  border-radius: 3px;
  width: 170px;
  margin: 0 15px;
  padding: 2px 8px 2px 3px;
  cursor: pointer;

    >.MuiSvgIcon-root {
      color: #5F5F5F;
      margin-right: 2px;
    }
`;

const Call = styled.div`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #BABABA;
  border-radius: 3px;
  width: 100px;
  padding: 2px 8px 2px 3px;
  cursor: pointer;

    >.MuiSvgIcon-root {
      color: #5F5F5F;
      margin-right: 2px;
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
  background: #F5F5F5;
  border: 1px solid #c1c1c1;
  border-radius: 10px;
  padding: 30px;
  height: 500px;
  min-width: 500px;
  flex-direction: column;
  z-index: 20;

    ${HeaderLeft} {
      color: #000;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 15px 0;

    :hover{
      background: rgba(0, 0, 0, .1);
    }
    >h3 {
      padding-top: 8px;
      margin-left: 10px;
      font-size: 0.8rem;
      font-weight: 400;
    }
`;

const MembersContainer = styled.div`
  overflow-y: scroll;
  height: 350px;

    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: #888888;
    }
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