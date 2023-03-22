import { Avatar, Box, BoxProps, Typography } from "@mui/material";
import React from "react";
import { Conversation } from "types/ConversationSerializer";
import { useStyles } from "./styles";
import ChatLatestMessage from "./ChatLatestMessage";
import moment from "moment";
import { useChat } from "context/ChatContext";

type Props = {
  disc: Conversation;
} & BoxProps;

const Discussion = (props: Props) => {
  const { disc, ...other } = props;
  const classes = useStyles();
  const { chatId } = useChat();
  return (
    <Box className={classes.discussion} component={"div"} {...other}>
      <Box position={"relative"}>
        <Avatar
          className={classes.discImg}
          alt={disc.title}
          src={disc.imageUrl}
          sx={{ color: "#fff", border: "1px solid #ccc" }}
        />
        {disc.online && <span className={classes.online}></span>}
      </Box>
      <Box display={"flex"} flexDirection={"column"} flex={1}>
        <span
          className={
            chatId ? classes.discussionNameSelected : classes.discussionName
          }
        >
          {disc.title}
        </span>
        {disc.latest_message ? (
          <Typography noWrap maxWidth={"100%"} textOverflow={"ellipsis"}>
            <ChatLatestMessage
              message={disc.latest_message}
              style={{
                color: chatId === disc.id ? "#fff" : "#597ee3",
              }}
            />
          </Typography>
        ) : (
          <span
            className={
              chatId ? classes.discLatestMsgSelected : classes.discLatestMsg
            }
          >
            select discussion an start chating
          </span>
        )}
      </Box>
      {disc.latest_message && (
        <Box>
          <span
            style={{
              color: chatId === disc.id ? "#fff" : "#597ee3",
            }}
          >
            {moment(disc.latest_message.timestamp).format("HH:MM a")}
          </span>
        </Box>
      )}
    </Box>
  );
};

export default Discussion;
