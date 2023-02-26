import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Message from "./Message";
import { Conversation } from "types/ConversationSerializer";
import { useAuthContext } from "context/AuthContext";
import ApiService from "utils/ApiService";
import { useChatContext } from "context/ChatContext";
import { WebSocketClient } from "vite";

type Props = {
  messages: [];
};

const index = (props: Props) => {
  const { messages } = props;
  const { userToken } = useAuthContext();
  const { discussionId } = useChatContext();
  console.log("====================================");
  console.log(props);
  console.log("====================================");
  let webSocket: WebSocket;
  if (discussionId) {
    webSocket = new WebSocket(
      ApiService.wsEndPoint +
        `ws/discussion_chat/${discussionId}/?token=${userToken}`
    );
  }

  useEffect(() => {
    webSocket.onopen = (e) => {
      console.log("WebSocket Client Chat Connected", { e });
    };
    webSocket.send("hello");
    webSocket.onmessage = (message) => {
      console.log(message);
      // const messageData = JSON.parse(message.data);
      // setMessages((prevMessages) => [...prevMessages, messageData]);
    };
    webSocket.onclose = () => {
      console.log("WebSocket Client Disconnected");
    };
    return () => {
      webSocket.close();
    };
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        position: "relative",
      }}
    >
      {messages?.map((msg, index) => (
        <Message message={msg} key={index} />
      ))}
    </Box>
  );
};

export default index;
