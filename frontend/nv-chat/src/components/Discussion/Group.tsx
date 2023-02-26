import React,{useEffect} from 'react'
import { GroupSerializer } from 'types/GroupSerializer'
import moment from 'moment'
import { Avatar, Box, Typography } from '@mui/material'
import LatestMessage from './LatestMessage'
import ApiService from 'utils/ApiService'
import { useAuthContext } from 'context/AuthContext'
import { useChatContext } from 'context/ChatContext'

type Props = {
    group:GroupSerializer
}

const Group = (props: Props) => {
    const {group} = props;
    const {userToken} = useAuthContext()
    const {selectedGroup, setSelectedGroup,selectedChatType, setSelectedChatType} = useChatContext()

    const formattedDate = moment(group.latest_message?.created_at).format("DD/MM/YYYY");
  
  const displayDate = moment(group.latest_message?.created_at).isSame(new Date(), "day")
    ? "Today"
    : formattedDate;

    const webSocket = new WebSocket(ApiService.wsEndPoint+`ws/group_chat/${group.id}/?token=${userToken}`)

    useEffect(()=>{
      webSocket.onopen = (e) => {
        console.log('WebSocket Client Connected',{e});
      };
      webSocket.onmessage = (message) => {
        console.log(message);
        // const messageData = JSON.parse(message.data);
        // setMessages((prevMessages) => [...prevMessages, messageData]);
      };
      webSocket.onclose = () => {
        console.log('WebSocket Client Disconnected');
      };
      return () => {
        webSocket.close();
      };
    },[])
    return (
      <Box
        // component={Paper}
        onClick={()=>{
          setSelectedGroup(group)
          setSelectedChatType("group");
        }}
        sx={(theme) => ({
          display: "flex",
          padding: theme.spacing(1),
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        borderRadius:theme.shape.borderRadius,

          backgroundColor: ((selectedChatType ==='group') && (selectedGroup && selectedGroup.id ===  group.id ))?theme.palette.primary.dark:"#175beed9",
          ":hover": {
            backgroundColor: theme.palette.primary.dark,
            opacity:.5
            
          },
          "&::selection": {
            backgroundColor: "transparent",
            color: "inherit",
          },
          "&:active": {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          },
          "&:focus": {
            outline: "none",
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          },
          "& >*": {
            color: "#fff",
          },
        })}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            padding: theme.spacing(.5),
            justifyContent: "space-between",
            alignItems: "center",
            // mx: theme.spacing(0.1),
          })}
        >
          <Box>
            <Avatar src={group.image} />
          </Box>
          <Box sx={(theme) => ({ mx: theme.spacing(1) })}>
            <Typography>{group.chat_name}</Typography>
            <LatestMessage message={group.latest_message} />
          </Box>
        </Box>
        <Box>
          <Typography variant="caption">
            {displayDate}
            {/* {moment(group.latest_message?.timestamp).format("MMM D, YYYY")} */}
          </Typography>
        </Box>
      </Box>
    );
}

export default Group