import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addChannel } from '../../api/api';
import { headers } from '../../Headers';
import AddMember from './AddMember';
import styled from 'styled-components';


function AddChannel() {
  //state
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState('');
  const [addMemberToggle, setAddMemberToggle] = useState(false);
  const [userData, setUserData] = useState([]);
  const [channelName, setChannelName] = useState('');

  //variables 
  const history = useHistory();

  const handleGetAddMemberArray = (data) => {
    const memberId = data.map(user => user.id)
    setUserData(memberId)
    console.log(userData)
  }

  const handleToggleAddMembersForm = () => {
    setAddMemberToggle(!addMemberToggle)
  }

  const handleChannelInput = (e) => {
    setChannelName(e.target.value)
  }

  const handleAddChanneltoAddMembers = (e) => {
    e.preventDefault();

    if (channelName.length < 3 || (channelName === '')
        || channelName.length > 15) {
        setError(`Error: can't add channel`)
        return setWarning(true)
    }
    //When you click next, AddMember component will toggle to true
    handleToggleAddMembersForm()
    setError('')
    setWarning(false)
  }

  const createChannel = () => {
    const addNewChannelObj = {
      name: channelName,
      user_ids: userData,
      headers
    }
    
    //add channel api
    addChannel(addNewChannelObj)
      .then(res => {
        const channelID = res.data.data.
        handleToggleAddChannel()
        history.push(`/channel/${channelID}`)
        console.log(`Successfully added`, res)
      })
      .catch(err => err)
    
    setWarning(false)
  }
  return (
    <AddChannelOuterContainer>
      <AddChannelContainer>
        {!addMemberToggle
          ?
            <AddChannelForm onSubmit={handleAddChanneltoAddMembers}>
              <AddChannelInput
                placeholder='Add Channel Name'
                onChange={handleChannelInput}
                value={channelName}
              />
              <button onClick={handleAddChanneltoAddMembers}>Next</button>
              <ErrorStyle>{warning ? <p>{error}</p> : ''}</ErrorStyle>
            </AddChannelForm>
          : ''
        }
        {addMemberToggle
          ?
            <div>
              <AddMember
              addMember={handleGetAddMemberArray}
              channelName={channelName}
              />
              <button onClick={createChannel}>Add Channel with Members</button>
            </div>
          : ''
        }
        
      </AddChannelContainer>
    </AddChannelOuterContainer>
  ) 
}

export default AddChannel;

const AddChannelOuterContainer = styled.div`
  color: #000;
  position: absolute;
  left: 42%;
  top: 30%;
  margin: 0 auto;
  z-index; 2;
  text-align: center;
`;

const AddChannelContainer = styled.div`
  z-index: 2;
  height: 40vh;
  width: 30vw;
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  font-size: 1vh;
  box-shadow: 0 1px 3px rgba(219, 219, 219, 0.9), 0 1px 2px rgba(199, 194, 194, 0.75);
  border-radius: 2vh;
`;

const AddChannelForm = styled.form`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const AddChannelInput = styled.input`
  font-size: 2vh;
  padding: 1.5vh;
  height: 2vh;
  margin: auto;
  border-radius: 2vh;
  border: 1px solid black;
  width: 100%;
`;

const AddMemberChannelForm = styled.form`
  margin: auto;
  display: flex;
  width: 80%;
  padding: 2vh;
`;

const AddMemberChannelSearch = styled.input`
  width: 100%;
  padding: 1.5vh;
  height: 2vh;
  margin: auto;
  border-radius: 2vh;
  border: 1px solid black;
  font-size: 2vh;
`;

const ErrorStyle = styled.div`
  >p {
    color: red;
  }
`;