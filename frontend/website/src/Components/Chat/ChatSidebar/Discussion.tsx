import { Avatar, Box, BoxProps, Typography } from "@mui/material";
import React, { useMemo } from "react";
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
  const r = useMemo(() => {
    return Math.round(Math.random() * 254);
  }, []);
  const g = useMemo(() => {
    return Math.round(Math.random() * 254);
  }, []);
  const b = useMemo(() => {
    return Math.round(Math.random() * 254);
  }, []);

  const a = useMemo(() => {
    return Math.random();
  }, []);

  return (
    <Box className={classes.discussion} component={"div"} {...other}>
      <Box position={"relative"}>
        <Avatar
          className={classes.discImg}
          alt={disc.title}
          src={disc.imageUrl && disc.imageUrl}
          sx={{
            color: "#fff",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "1px solid #ccc",
            objectFit: "cover",
            // backgroundColor: "#ffffff47",
            backgroundColor: `rgba(${r},${g},${b},${a})`,
          }}
        >
          {disc.title.charAt(0).toUpperCase()}
        </Avatar>
        {disc.online && <span className={classes.online}></span>}
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        flex={1}
        overflow={"hidden"}
      >
        <span
          className={
            chatId ? classes.discussionNameSelected : classes.discussionName
          }
          style={{ display: "block", color: "#fff", fontWeight: "bold" }}
        >
          {disc.title.toUpperCase()}
        </span>
        {disc.latest_message ? (
          <Typography variant="caption">
            <ChatLatestMessage
              message={disc.latest_message}
              style={{
                color: chatId === disc.id ? "#fff" : "#597ee3",
              }}
            />
          </Typography>
        ) : (
          <Typography
            variant="caption"
            className={
              chatId ? classes.discLatestMsgSelected : classes.discLatestMsg
            }
          >
            select discussion an start chating
          </Typography>
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

export default React.memo(Discussion);
