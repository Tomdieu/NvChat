import { Box } from "@mui/material";
import React, { useState } from "react";
import { useStyles } from "./styles";

import GroupMessage from "../Message/GroupMessage";
import { GroupMessageSerializer } from "types/GroupMessageSerializer";

type Props = {
  messages: GroupMessageSerializer[];
};

const MessagesList = (props: Props) => {
  const classes = useStyles();
  const { messages } = props;

  const getSenderName = (message: GroupMessageSerializer): string => {
    return message.sender.user.username;
  };

  return (
    <Box className={classes.messageList}>
      {messages?.map((message, index) => (
        <GroupMessage
          isMine={Boolean(getSenderName(message) === "ivantom")}
          groupMessage={message}
        />
      ))}
      {/* <GroupMessage isMine={true} />
      <GroupMessage isMine={false} />
      <GroupMessage isMine={true} />
      <GroupMessage isMine={false} /> */}
    </Box>
  );
};

export default MessagesList;
