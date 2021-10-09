import React, { useEffect, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { getChannel, getRecentDm, getOwnedChannel } from '../../api/api';
import SidebarOption from './SidebarOption';
import styled from 'styled-components';
//Icons
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import EmailIcon from '@material-ui/icons/Email';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';


function Sidebar() {
  //state
  const [email, setEmail] = useState('');
  const [channelsJoined, setChannelsJoined] = useState([]);
  const [channelsOwned, setChannelsOwned] = useState([]);
  const history = useHistory();
  //variables
  const username = email.split('@')[0];

  //route to message page
  const messagePage = () => {
    history.push('/message')
  }
  
  useEffect(() => {
    //variables
    const headers = {
      'token': localStorage.getItem('access-token'),
      'client': localStorage.getItem('client'),
      'expiry': localStorage.getItem('expiry'),
      'uid': localStorage.getItem('uid')
    }
    const channelData = { headers }
    setEmail(headers.uid)
  
    //get channels joined
    getChannel(channelData)
      .then(res => {
        setChannelsJoined(res.data.data)
        
      })
      .catch(err => console.log(err));
    
    //get owned channels
    getOwnedChannel(channelData)
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
    return (
      <NavLink
        to={`/channel/${channel.id}`}
        style={{ textDecoration: 'none', color: '#fff' }}
      >
        <SidebarOption
          key={i}
          Icon={InsertCommentIcon}
          title={channel.name}
        />
      </NavLink>
    )
  });


  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>{email}</h2>
          <h3>
            <FiberManualRecordIcon />
            {username}
          </h3>
        </SidebarInfo>
        <CreateIconStyle onClick={messagePage}/>
      </SidebarHeader>
      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & Reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <hr />
      <SidebarOption Icon={AddIcon} title='Add Channel' />
      <SidebarOption Icon={PeopleAltIcon} title="Channels Owned" />
      {renderOwnedChannels}
      <hr />
      <SidebarOption Icon={PeopleAltIcon} title="Channel Joined" />
      {renderJoinedChannels}  
    </SidebarContainer>
  )
};

export default Sidebar;

const SidebarContainer = styled.div`
  color: #fff;
  background-color: var(--slack-color);
  border-top: 1px solid #49274b;
  width: 300px;
  margin-top: 40px;
  overflow-y: auto;

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