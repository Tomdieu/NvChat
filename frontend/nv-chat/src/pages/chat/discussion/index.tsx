import TopChatBar from "components/TopChatBar";
import { useChatContext } from "context/ChatContext";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import MessageContainer from "components/Discussion/MessageContainer";
import InputMessageContainer from "components/Discussion/InputMessageContainer";
import { Box } from "@mui/material";
import { useAuthContext } from "context/AuthContext";
import ApiService from "utils/ApiService";
import { TextMessage } from "types/AbstractMessage";
import { Conversation } from "types/ConversationSerializer";
import { Message } from "types/Message";

type Props = {};

const index = (props: Props) => {
  const { id } = useParams();
  const {
    selectedChatType,
    selectedDiscussion,
    discussionsList,
    setDiscussionsList,
  } = useChatContext();

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [text, setText] = useState("");
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
      // console.log("Recieve Message : ", { message });
      const messageData = JSON.parse(message.data);
      // console.log("Recieve Message : ");
      // console.log(messageData.message)
      addRecieveMessage(messageData.message);
      // setMessages((prevMessages) => [...prevMessages, messageData]);
    };
    webSocket.onclose = () => {
      console.log("WebSocket Client Disconnected");
    };
    // return () => {
    //   webSocket.close();
    // };
  }, []);

  const addRecieveMessage = (newMessage: Message) => {
    const filterDiscussion = discussionsList.find(
      (disc: Conversation) => disc.id === Number(id)
    );
    console.log(filterDiscussion);
    filterDiscussion.latest_message = newMessage;
    filterDiscussion.messages.push(newMessage);
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
  };

  const handleSend = () => {
    if (text) {
      const textMessage: TextMessage = {
        text: text,
        resourcetype: "TextMessage",
      };
      handleSendMessage(textMessage);
    }
  };

  const handleKeyUp = (e:React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      return handleSend();
    }
  };

  const handleSendMessage = (msg: TextMessage) => {
    if (msg) {
      webSocket.send(JSON.stringify({ message: msg }));
      setText("");
    }
  };

  const handleClick = () => {
    return handleSend();
  };

  const handleTyping = () => {};

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
    return handleTyping();
  };

  const handleFileSelected = (event) => {
    const files = event.target.files;
    // Do something with the selected files
  };

  const handleImageSelected = (event) => {
    const images = event.target.files;
    // Do something with the selected images
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageButtonClick = () => {
    imageInputRef.current.click();
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        maxHeight: "100vh",
        overflowY: "auto",
        overflowX: "none",
      }}
    >
      <TopChatBar chatType={selectedChatType} name={name} />
      <MessageContainer messages={messages} />
      <InputMessageContainer
        handleSendMessage={handleSendMessage}
        value={text}
        onFileClick={handleFileButtonClick}
        onImageClick={handleImageButtonClick}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onClick={handleClick}
      />

      {/* inputs */}
      {/* files */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelected}
      />
      {/* images or videos */}
      <input
        type="file"
        ref={imageInputRef}
        style={{ display: "none" }}
        accept="image/*,video/*"
        onChange={handleImageSelected}
      />
    </Box>
  );
};

export default index;
