import { Box } from "@mui/material";
import React, { useState } from "react";
import { useStyles } from "./styles";

import GroupMessage from "../Message/GroupMessage";
import { GroupMessageSerializer } from "types/GroupMessageSerializer";
import { useAuth } from "Context/AuthContext";

type Props = {
  messages: GroupMessageSerializer[];
  ref?: React.LegacyRef<HTMLDivElement>;
};

const MessagesList = (props: Props) => {
  const classes = useStyles();
  const { messages, ref } = props;

  const { userProfile } = useAuth();

  const getSenderName = (message: GroupMessageSerializer): string => {
    return message.sender.user.username;
  };

  return (
    <Box className={classes.messageList}>
      {messages?.map((message, index) => (
        <GroupMessage
          key={index}
          isMine={Boolean(getSenderName(message) === userProfile.user.username)}
          groupMessage={message}
        />
      ))}
    </Box>
  );
};

export default MessagesList;
