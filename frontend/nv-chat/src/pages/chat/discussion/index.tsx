import TopChatBar from "components/TopChatBar";
import { useChatContext } from "context/ChatContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MessageContainer from "components/Discussion/MessageContainer";
import InputMessageContainer from "components/Discussion/InputMessageContainer";
import { Box } from "@mui/material";
import { useAuthContext } from "context/AuthContext";
import ApiService from "utils/ApiService";
import { TextMessage } from "types/AbstractMessage";
import { Conversation } from "types/ConversationSerializer";

type Props = {};

const index = (props: Props) => {
  const { id } = useParams();
  const {
    selectedChatType,
    selectedDiscussion,
    discussionsList,
    setDiscussionsList,
  } = useChatContext();
  const { userToken, userProfile } = useAuthContext();
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState(selectedDiscussion.messages);
  const name = selectedDiscussion.title;
  const [replyMessage, setReplyMessage] = useState(null);

  const webSocket = new WebSocket(
    ApiService.wsEndPoint + `ws/discussion_chat/${id}/?token=${userToken}`
  );

  useEffect(() => {
    webSocket.onopen = (e) => {
      console.log("WebSocket Established", { e });
    };
    webSocket.onmessage = (message) => {
      console.log(message);
      // const messageData = JSON.parse(message.data);
      // setMessages((prevMessages) => [...prevMessages, messageData]);
    };
    webSocket.onclose = () => {
      console.log("WebSocket Client Disconnected");
    };
    // return () => {
    //   webSocket.close();
    // };
  }, []);

  const handleSendMessage = (msg: TextMessage) => {
    // console.log(discussionsList)
    const filterDiscussion = discussionsList.find(
      (disc: Conversation) => disc.id === Number(id)
    );
    console.log(filterDiscussion);
    filterDiscussion.latest_message = {
      conversation: id,
      sender: userProfile,
      parent_message: null,
      message: msg,
      timestamp: `${new Date()}`,
    };
    filterDiscussion.messages.push({
      id: Number(Math.random() + 100),
      conversation: id,
      sender: userProfile,
      parent_message: null,
      message: msg,
      timestamp: `${new Date()}`,
    });
    console.log(discussionsList);

    let newDiscussion = [];
    var updated = false;
    discussionsList.map((disc: Conversation, i: number) => {
      var found = disc[id] === id;
      if (found) {
        discussionsList[i] = filterDiscussion;
        updated = true;
      }
    });
    if (!updated) {
      newDiscussion.push(filterDiscussion);
    }

    setDiscussionsList(newDiscussion);
    // setDiscussionsList((previousMessage) => [...previousMessage, filterDiscussion]);
    if (msg) {
      webSocket.send(JSON.stringify({ message: msg }));
    }
  };
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
      }}
    >
      <TopChatBar chatType={selectedChatType} name={name} />
      <MessageContainer messages={messages} />
      <InputMessageContainer handleSendMessage={handleSendMessage} />
    </Box>
  );
};

export default index;
