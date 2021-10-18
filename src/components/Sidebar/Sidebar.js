import React, { useEffect, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { getChannel, getRecentDm, getOwnedChannel } from '../../api/api';
import AddChannel from '../Channel/AddChannel';
import SidebarOption from './SidebarOption';
import styled from 'styled-components';
import Alert from '../Alert/Alert';
import { emailFormat } from '../Utils/utils';

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
import AppsIcon from "@material-ui/icons/Apps";
import LockIcon from '@material-ui/icons/Lock';

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
  const [render, setRender] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [channelsJoined, setChannelsJoined] = useState([]);
  const [channelsOwned, setChannelsOwned] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [toggleAddChannel, setToggleAddChannel] = useState(false);
  const [toggleWarning, setToggleWarning] = useState(false);
  const [error, setError] = useState('');
  const [style, setStyle] = useState({display: 'none'});

  //variables
  const history = useHistory();
  const userID = parseInt(localStorage.getItem('id'));
  const user = localStorage.getItem('uid');

  //refreshes the sidebar everytime we add the channel
  const handleRender = () => {
    setRender(!render)
  }
  
  const handleToggleAddChannel = (e) => {
    //e.stopPropagation()
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
        if(res.data.errors === 'No available channels.'){
          setError(res.data.errors)
          setChannelsJoined([])
        } else {
          setChannelsJoined(res.data.data)
        }
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
        if(res.data.errors === 'No available owned channels.'){
          //setError(res.data.errors)
          setChannelsOwned([])
        } else {
          setChannelsOwned(res.data.data)
        }
      })
      .catch(err => err)
  }, [render, recentUsers]);

  //render all channel (owned)
  const renderOwnedChannels = channelsOwned.map((channel, i) => {
    return (
      <NavLink
        to={`/channel/${channel.id}`}
        style={{ textDecoration: 'none', color: '#fff' }}
        key={i}
      >
        <SidebarOption
          Icon={LockIcon}
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
          <SidebarOption 
            Icon={AppsIcon} 
            title={channel.name} 
          />
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
          <SidebarOption Icon={PeopleAltIcon} title={emailFormat(user.uid)} key={i} />
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
            {emailFormat(user)}
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
      
        <div         
          onMouseEnter={e => {
          setStyle({display: 'block'})
          }}
          onMouseLeave={e => {
            setStyle({display: 'none'})
          }}
        >
        <SidebarOption
          Icon={togDropdown ? ExpandMoreIcon : ChevronRightIcon}
          title='Channels'
          onClick={handleToggleDropdown}
          addChannelIcon={true}
          handleToggleAddChannel={handleToggleAddChannel}
          style={style}
        />
        <p style={{color: '#BCABBC', paddingLeft: '1rem'}}>{error}</p>
      </div>
      <div className={togDropdown ? `sidebar-channel` : `sidebar-channels hidden`}>
        {renderOwnedChannels}
        {renderJoinedChannels}
        <SidebarOption 
          Icon={AddIcon} 
          title='Add Channel' 
          onClick={handleToggleAddChannel}
          />
      </div>
        {toggleAddChannel ? 
          <AddChannel 
            handleToggleAddChannel={handleToggleAddChannel}
            handleRender={handleRender}
          /> 
        : null} 

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
  width: 100%;
  max-width: 250px;
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
      text-transform: capitalize;
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