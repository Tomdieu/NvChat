import { Box } from "@mui/material";
import React, { useState } from "react";
import { useStyles } from "./styles";

import GroupMessage from "../Message/GroupMessage";
import { GroupMessageSerializer } from "types/GroupMessageSerializer";
import { useAuth } from "context/AuthContext";
import { Message } from "types/Message";
import DiscussionMessage from "../Message/DiscussionMessage";

type Props = {
  messages: GroupMessageSerializer[] | Message[];
  ref?: React.LegacyRef<HTMLDivElement>;
  type: "DISCUSSION" | "GROUP";
  onMsgClick?: (message: GroupMessageSerializer | Message) => void;
};

const MessagesList = (props: Props) => {
  const classes = useStyles();
  const { messages, ref, type, onMsgClick } = props;

  const [_messages, setMessages] = useState<
    GroupMessageSerializer[] | Message[]
  >([]);

  const { userProfile } = useAuth();

  // useEffect(() => {
  //   // const uniqueMsg = messages.reduce((acc, current) => {
  //   //   if (!acc[current.id]) {
  //   //     acc[current.id] = current;
  //   //   }
  //   //   return acc;
  //   // }, {});
  //   // setMessages(Object.values(uniqueMsg))

  // }, [messages]);

  const getSenderName = (message: GroupMessageSerializer | Message): string => {
    // console.log(message.sender.user);

    return message.sender.user.username;
  };

  return (
    <Box className={classes.messageList}>
      {type === "GROUP" &&
        messages?.map((message, index) => (
          <GroupMessage
            onClick={(e, groupMsg) => {
              onMsgClick(groupMsg);
            }}
            key={index}
            isMine={Boolean(
              getSenderName(message) === userProfile.user.username
            )}
            groupMessage={message}
          />
        ))}
      {type === "DISCUSSION" &&
        messages?.map((message, index) => (
          <DiscussionMessage
            key={index}
            onClick={(e, discMsg) => onMsgClick(discMsg)}
            isMine={Boolean(
              getSenderName(message) === userProfile.user.username
            )}
            discussionMessage={message}
          />
        ))}
    </Box>
  );
};

export default MessagesList;
