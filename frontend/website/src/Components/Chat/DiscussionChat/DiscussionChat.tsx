import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useChat } from "context/ChatContext";
import React, { useRef, useEffect, useState } from "react";
import MessageInput from "../global/MessageInput/MessageInput";
import MessagesList from "../global/MessagesList/MessagesList";
import ChatTopbar from "../ChatTopbar/ChatTopbar";
import ApiService from "utils/ApiService";
import { useAuth } from "context/AuthContext";
import { TextMessage } from "types/AbstractMessage";
import { Message } from "types/Message";

import EmojiPicker from "emoji-picker-react";
import { GroupMessageSerializer } from "types/GroupMessageSerializer";
import { Close } from "@mui/icons-material";

type Props = {};

const ActiveDiscussion = () => {
  const {
    chatId,
    isRightOpen,
    discussions,
    setDiscussions,
    selectedDiscussion,
    setIsRightOpen,
  } = useChat();

  const [socket, setSocket] = useState<WebSocket>(null);
  const [replyMessage, setReplyMessage] = useState<
    GroupMessageSerializer | Message
  >(null);
  const { userToken, userProfile } = useAuth();

  const [message, setMessage] = React.useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    setMessage("");
    const ws = new WebSocket(
      ApiService.wsEndPoint + `ws/discussion_chat/${chatId}/?token=${userToken}`
    );
    setSocket(ws);
    return () => {
      ws.close();
    };
  }, [chatId]);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("Connection established");
      };
      socket.onclose = () => {
        console.log("Connection Close");
      };
      socket.onmessage = (e: MessageEvent<any>) => {
        console.log("Message Recieved ");

        const newMessage = JSON.parse(e.data);
        if (newMessage.message && newMessage.message.id) {
          addNewMessage(newMessage.message);
        }
      };
    }
  }, [socket]);

  const addNewMessage = (newMessage: Message) => {
    const filterChats = discussions.find((chat) => chat.id === chatId);

    filterChats.latest_message = newMessage;
    filterChats.messages.push(newMessage);

    // setSelectedDiscussion(filterChats);

    const otherChats = discussions.filter((chat) => chat.id !== chatId);
    otherChats.push(filterChats);

    setDiscussions(otherChats);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      console.log(file);

      const fileName = file.name.toLowerCase();

      const isImage =
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".jpeg") ||
        fileName.endsWith(".png") ||
        fileName.endsWith(".gif");
      const isVideo =
        fileName.endsWith(".mp4") ||
        fileName.endsWith(".mov") ||
        fileName.endsWith(".avi") ||
        fileName.endsWith(".mkv") ||
        fileName.endsWith(".wmv");

      const formData = new FormData();

      if (isImage) {
        formData.append("caption", message);
        formData.append("image", file);
        formData.append("resourcetype", "ImageMessage");
      }

      if (isVideo) {
        formData.append("caption", message);
        formData.append("video", file);

        formData.append("resourcetype", "VideoMessage");
      }

      if (!isImage && !isVideo) {
        formData.append("caption", message);
        formData.append("file", file);

        formData.append("resourcetype", "FileMessage");
      }

      if (replyMessage) {
        formData.append("parent_message_id", replyMessage.id.toString());
      }

      setMessage("");
      ApiService.sendDiscussionMessage(formData, chatId, userToken)
        .then((res) => res.json())
        .then((data) => {
          socket.send(JSON.stringify({ message: data.data }));
          // wsRef.current.send(JSON.stringify({ message: data.data }));
        })
        .catch((err) => console.log(err))
        .finally(() => setReplyMessage(null));
    }
  };

  const handleSend = () => {
    if (message) {
      const formData = new FormData();
      formData.append("text", message);
      formData.append("resourcetype", "TextMessage");
      if (replyMessage) {
        formData.append("parent_message_id", replyMessage.id.toString());
      }
      setMessage("");

      ApiService.sendDiscussionMessage(formData, chatId, userToken)
        .then((res) => res.json())
        .then((data) => {
          socket.send(JSON.stringify({ message: data.data }));
          // wsRef.current.send(JSON.stringify({ message: data.data }));
        })
        .catch((err) => console.log(err))
        .finally(() => setReplyMessage(null));
    }
  };
  const handleEmogiClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setEmojiOpen(true);
  };
  const handleKeydown = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const username = userProfile.user.username;
    socket.send(
      JSON.stringify({ typing: true, message: `${username} is typing` })
    );
  };
  const handleKeyup = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    socket.send(JSON.stringify({ typing: false, message: `` }));
  };
  return (
    <Grid
      item
      md={isRightOpen ? 6 : 9}
      sm={8}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <ChatTopbar
        name={selectedDiscussion?.title}
        icon={selectedDiscussion?.imageUrl}
        onClick={() => setIsRightOpen(!isRightOpen)}
      />
      <MessagesList
        messages={selectedDiscussion.messages}
        type="DISCUSSION"
        onMsgClick={(message) => setReplyMessage(message)}
      />
      <MessageInput
        text={message}
        onChange={handleChange}
        onFileClick={() => fileInputRef.current.click()}
        onSendClick={handleSend}
        msgToReply={replyMessage}
        onCancleReplyMsg={() => setReplyMessage(null)}
        onEmojiClick={handleEmogiClick}
        onKeyDown={handleKeydown}
        onBlur={handleKeyup}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {emojiOpen && (
        <Box sx={{ position: "absolute", bottom: "10%", left: "5%" }}>
          <Box position={"relative"}>
            <EmojiPicker
              emojiStyle="native"
              onEmojiClick={(emojiObject, event) => {
                console.log(emojiObject.emoji);
                setMessage(message + emojiObject.emoji);
              }}
            />
            <IconButton
              sx={{ position: "absolute", right: 0, bottom: "3%", zIndex: 999 }}
              onClick={() => setEmojiOpen(false)}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
      )}
    </Grid>
  );
};

const NoActiveChat = () => {
  const { isRightOpen } = useChat();
  return (
    <Grid
      item
      md={isRightOpen ? 6 : 9}
      sm={8}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        maxHeight: "100vh",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#5e5e5e40",
      }}
    >
      <Typography
        variant="h3"
        textAlign={"justify"}
        fontStyle={"oblique"}
        fontSize={"3rem"}
        color={"#117fa7"}
      >
        Select a Friend Chat and start discussion
      </Typography>
    </Grid>
  );
};

const DiscussionChat = () => {
  const { chatId } = useChat();

  if (chatId) {
    return <ActiveDiscussion />;
  }
  return <NoActiveChat />;
};

export default React.memo(DiscussionChat);
