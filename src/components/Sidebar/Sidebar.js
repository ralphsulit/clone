import React, { useEffect, useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
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
  const [toggleAddChannel, setToggleAddChannel] = useState(false);

  //toggles add channel
  const handleToggleAddChannel = () => {
    setToggleAddChannel(!toggleAddChannel);
  }

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>email</h2>
          <h3>
            <FiberManualRecordIcon />
            user
          </h3>
        </SidebarInfo>
        <CreateIconStyle/>
      </SidebarHeader>
      <hr /><hr />
      <SidebarOption icon={AddIcon} title='Add Channel' />

    </SidebarContainer>
  )
}

export default Sidebar;

const SidebarContainer = styled.div`
  color: #fff;
  background-color: var(--slack-color);
  border-top: 1p solid #49274b;
  flex; 0.5;
  max-width: 260px;
  margin-top: 60px;
  overflow-y: auto;

    >hr {
      margin: 10px 0;
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
      font-size: 18px;
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