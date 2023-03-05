import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Conversation } from "types/ConversationSerializer";
import moment from "moment";
import { Message } from "types/Message";
import LatestMessage from "./LatestMessage";
import ApiService from "utils/ApiService";
import { useAuthContext } from "context/AuthContext";
import { useChatContext } from "context/ChatContext";
import { useNavigate } from "react-router-dom";

type Props = {
  conversation: Conversation;
};

const Discussion = (props: Props) => {
  const { conversation } = props;
  const { userToken } = useAuthContext();
  const {
    selectedDiscussion,
    setSelectedDiscussion,
    selectedChatType,
    setSelectedChatType,
    setDiscussionId,
  } = useChatContext();
  const formattedDate = moment(conversation.latest_message?.timestamp).format(
    "DD/MM/YYYY"
  );

  const displayDate = moment(conversation.latest_message?.timestamp).isSame(
    new Date(),
    "day"
  )
    ? "Today"
    : formattedDate;

  const navigate = useNavigate();
  return (
    <Box
      // component={Paper}
      onClick={() => {
        setSelectedDiscussion(conversation);
        setSelectedChatType("discussion");
        setDiscussionId(conversation.id);
        navigate("/app/chat/discussion/" + conversation.id);
      }}
      sx={(theme) => ({
        display: "flex",
        padding: theme.spacing(1),
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: theme.shape.borderRadius,
        // opacity:((selectedChatType ==='discussion') && (selectedDiscussion && selectedDiscussion.id ===  conversation.id ))?1:.5,
        backgroundColor:
          selectedChatType === "discussion" &&
          selectedDiscussion &&
          selectedDiscussion.id === conversation.id
            ? theme.palette.primary.dark
            : theme.palette.success.light,
        ":hover": {
          // backgroundColor: theme.palette.primary.dark,
          //   opacity:.5
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
          padding: theme.spacing(0.5),
          justifyContent: "space-between",
          alignItems: "center",
          // mx: theme.spacing(0.1),
        })}
      >
        <Box>
          <Avatar src={conversation.imageUrl} />
        </Box>
        <Box sx={(theme) => ({ mx: theme.spacing(1) })}>
          <Typography>{conversation.title}</Typography>
          <LatestMessage message={conversation.latest_message} />
        </Box>
      </Box>
      <Box>
        <Typography variant="caption">
          {displayDate}
          {/* {moment(conversation.latest_message?.timestamp).format("MMM D, YYYY")} */}
        </Typography>
      </Box>
    </Box>
  );
};

export default Discussion;
