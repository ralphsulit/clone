import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addChannel } from '../../api/api';
import AddMember from './AddMember';
import styled from 'styled-components';
import CancelIcon from '@material-ui/icons/Cancel';


function AddChannel({handleToggleAddChannel, handleRender}) {
  //state
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState('');
  const [addMemberToggle, setAddMemberToggle] = useState(false);
  const [userDataArray, setUserDataArray] = useState([]);
  const [channelName, setChannelName] = useState('');

  //variables 
  const history = useHistory();

  const handleGetAddMemberArray = (data) => {
    const memberId = data.map(user => user.id)
    setUserDataArray(memberId)
    console.log(userDataArray)
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
      user_ids: userDataArray
    }
    
    //add channel api
    addChannel(addNewChannelObj)
    .then(res => {
        setError(res.data.errors)
        setWarning(true)
        if(res.data.errors === 'Name has already been taken'){
          return 
        }
        const channelID = res.data.data.id
        console.log(`Successfully added`, res)
        setWarning(false)
        handleToggleAddChannel()
        console.log('this works')
        handleRender()
        history.push(`/channel/${channelID}`)
      })
      .catch(err => err)
    
  }

  return (
    <AddChannelOuterContainer>
      <AddChannelContainer>      
        {!addMemberToggle
          ?
            <AddChannelForm onSubmit={handleAddChanneltoAddMembers}>        
            <CancelIcon onClick={handleToggleAddChannel}/>
              <h2>Create a channel</h2>
              <p>Channels are where your team communicates. They're best when organized around  a topic. #chika for example</p>
              <label>Name</label>
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
            <AddMemberDiv>
              <AddMember
              handleAddMemberArray={handleGetAddMemberArray}
              channelName={channelName}
              handleToggle={handleToggleAddChannel}
              />
              <ErrorStyle>{warning ? <p>{error}</p> : ''}</ErrorStyle>
            </AddMemberDiv>
          : ''
        }
        <DoneButtonDiv>
          {addMemberToggle && <button onClick={createChannel}>Done</button>}
        </DoneButtonDiv>
      </AddChannelContainer>
    </AddChannelOuterContainer>
  ) 
}

export default AddChannel;

const AddChannelOuterContainer = styled.div`
  color: #000;
  background-color: rgba(0, 0, 0, .7);
  position: absolute;
  margin: auto;
  z-index: 21;
  text-align: center;
  height: 100vh;
  width:100vw;
  top: -.01vh;
  display: flex;
`;

const AddChannelContainer = styled.div`
  z-index: 10;
  height: 500px;
  width: 450px;
  background-color: whitesmoke;
  margin: auto;
  font-size: 1vh;
  box-shadow: 0 1px 3px rgba(219, 219, 219, 0.9), 0 1px 2px rgba(199, 194, 194, 0.75);
  border-radius: 2vh;
  display: flex;
  flex-direction: column;
`;

const DoneButtonDiv = styled.div`
  margin-top: auto;
  margin-left: auto;
  padding: 2rem;

  > button {
    width: 10vh;
    margin: auto auto auto 20px;
    background-color: #350D36;
    border-radius: 5px;
    border: solid 1px transparent;
    color: white;
    padding: 1vh;
    position: absolute;
    bottom: 28%;
    right: 40%;
    font-weight:bolder;
    cursor: pointer;
  }
`

const AddChannelForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
    >h2{
      margin: 30px auto 10px 0px;
      font-size: 1.5rem;
    }

    >p{
      text-align: left;
      line-height: 15px;
      padding: 1vh 1vh 1vh 0;
      font-size: 0.70rem;
      color: #5f5f5f;
    }

    >label{
      text-align: left;
      font-size: 1rem;
      padding: 10px 10px 10px 0;
    }

    > button {
      width: 10vh;
      margin: auto auto auto 20px;
      background-color: #350D36;
      border-radius: 5px;
      border: solid 1px transparent;
      color: white;
      padding: 1vh;
      position: absolute;
      bottom: 28%;
      right: 40%;
      font-weight:bolder;
      cursor: pointer;
    }

      .MuiSvgIcon-root {
      margin-top: 1.5vh;
      margin-right: 2px;
      margin-left:98%;
      color: #cd5c5c;
      cursor: pointer;
    }
`;

const AddChannelInput = styled.input`
  font-size: 2vh;
  padding: 1.5vh;
  height: 2vh;
  border-radius: 5px;
  border: 1px solid #777777;
  width: 100%;
  padding: 2vh;
`;

const ErrorStyle = styled.div`
  >p {
    color: red;
    margin-top: 10px;
  }
`;

const AddMemberDiv = styled.div` 
  position: relative;
`;