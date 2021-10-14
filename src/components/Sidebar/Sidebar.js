import React, { useEffect, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { getChannel, getRecentDm, getOwnedChannel } from '../../api/api';
import AddChannel from '../Channel/AddChannel';
import SidebarOption from './SidebarOption';
import styled from 'styled-components';
import Alert from '../Alert/Alert';

import './Sidebar.css';
//Icons
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AddIcon from "@material-ui/icons/Add";

function Sidebar() {
  const headers = {
    'token': localStorage.getItem('access-token'),
    'client': localStorage.getItem('client'),
    'expiry': localStorage.getItem('expiry'),
    'uid': localStorage.getItem('uid')
  }

  //state
  const [email, setEmail] = useState('');
  const [togDropdown, setToggleDropdown] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [channelsJoined, setChannelsJoined] = useState([]);
  const [channelsOwned, setChannelsOwned] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [toggleAddChannel, setToggleAddChannel] = useState(false);
  const [toggleWarning, setToggleWarning] = useState(false);

  //variables
  const history = useHistory();
  const userID = parseInt(localStorage.getItem('id'));
  const user = localStorage.getItem('uid');

  const handleToggleAddChannel = () => {
    setToggleAddChannel(!toggleAddChannel)
  }

  const handleToggleDropdown = () => {
    setToggleDropdown(!togDropdown)
  }

  const handleToggleWarning = () => {
    setToggleWarning(!toggleWarning)
  }

  const handleToggle = () => {
    setToggle(!toggle)
  }

  //route to message page
  const messagePage = () => {
    history.push('/message')
  }

  const home = () => {
    history.push('/homepage')
  }

  useEffect(() => {
    //variables
    setEmail(headers.uid)
  
    //get channels joined
    getChannel()
      .then(res => {
        setChannelsJoined(res.data.data)
      })
      .catch(err => console.log(err));
    
    //get recent DMs
    getRecentDm()
      .then(res => {
        setRecentUsers(res.data.data)
      })
      .catch(err => console.log('Error Getting Recent User: ', err))
    
    //get owned channels
    getOwnedChannel()
      .then(res => {
        setChannelsOwned(res.data.data)
      })
      .catch(err => err)
  }, []);

  // render all channel (owned)
  const renderOwnedChannels = channelsOwned.map((channel, i) => {
    return (
      <NavLink
        to={`/channel/${channel.id}`}
        style={{ textDecoration: 'none', color: '#fff' }}
        key={i}
      >
        <SidebarOption
          key={i}
          Icon={InsertCommentIcon}
          title={channel.name}
        />
      </NavLink>
    )
  });

  // render all channel (joined)
  const renderJoinedChannels = channelsJoined.map((channel, i) => {
    if (userID !== channel.owner_id) {
      return (
        <NavLink
          style={{textDecoration: 'none', color: 'white'}} 
          to={`/channel/${channel.id}`}
          key={i}
        >
          <SidebarOption Icon={InsertCommentIcon} title={channel.name} key={i} />
        </NavLink>
      )
    }
  })

  //direct messages
  const recentDM = recentUsers.map((user, i) => {
    if (user.id !== userID) {
      return (
        <NavLink
          style={{textDecoration: 'none', color: 'white'}} 
          to={`/user/${user.id}`}
          key={i}
        >
          <SidebarOption Icon={PeopleAltIcon} title={user.uid} key={i} />
        </NavLink>
      )
    }
  })

  return (
    <SidebarContainer> 
      {toggleWarning ? <Alert handleToggleWarning={handleToggleWarning} /> : null} 
      <SidebarHeader>
        <SidebarInfo>
          <h2 onClick={home}>{email}</h2>
          <h3>
            <FiberManualRecordIcon />
            {user}
          </h3>
        </SidebarInfo>
        <CreateIconStyle onClick={messagePage}/>
      </SidebarHeader>
        <SidebarOption 
          Icon={InsertCommentIcon} 
          title="Threads" 
          onClick={handleToggleWarning}
        />
        <SidebarOption 
          Icon={AlternateEmailIcon} 
          title="Mentions & Reactions" 
          onClick={handleToggleWarning}
        />
        <SidebarOption 
          Icon={BookmarkBorderIcon} 
          title="Saved items" 
          onClick={handleToggleWarning}
        />
        <SidebarOption 
          Icon={MoreVertIcon} 
          title="More" 
          onClick={handleToggleWarning}
        />
      <hr />
      
      <SidebarOption
        Icon={togDropdown ? ExpandMoreIcon : ChevronRightIcon}
        title='Channels'
        onClick={handleToggleDropdown}
      />
      <div className={togDropdown ? `sidebar-channel` : `sidebar-channels hidden`}>
        {renderOwnedChannels}
        <SidebarOption Icon={AddIcon} title='Add Channel' onClick={handleToggleAddChannel}/>
        {toggleAddChannel ? <AddChannel/> : null} 
      </div>

      <SidebarOption
        Icon={toggle ? ExpandMoreIcon : ChevronRightIcon}
        title='Direct Messages'
        onClick={handleToggle}
      />
      <div className={toggle ? `sidebar-channel` : `sidebar-channels hidden`}>
        {recentDM}
      </div>

      
      
    </SidebarContainer>
  )
};

export default Sidebar;

const SidebarContainer = styled.div`
  color: #fff;
  background-color: var(--slack-color);
  border-top: 1px solid #49274b;
  width: 300px;
  overflow-y: auto;
  height: 100vh;

    >hr {
      margin-top: 10px;
      margin-bottom: 10px;
      border: 1px solid #49274b;
    }

    ::-webkit-scrollbar {
    display: none;
    }    
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  margin-top: 50px;

    >.MuiSvgIcon-root {
      padding: 8px;
      color: #49274b;
      font-size: 2rem;
      background-color: white;
      border-radius: 1000px;
    }
`;

const SidebarInfo = styled.div`
  flex: 1;

    >h2 {
      font-size: 16px;
      font-weight: 900;
      margin-bottom: 5px;
      cursor: pointer;
    }
    
    >h3 {
      display: flex;
      font-size: 13px;
      font-weight: 400;
      margin-bottom: 5px;
    }

    > h3 > .MuiSvgIcon-root {
      font-size: 14px;
      font-weight: 400;
      margin-top: 1px;
      margin-right: 2px;
      color: green;
    }
`;

const CreateIconStyle = styled(CreateIcon)`
  cursor: pointer;
`;