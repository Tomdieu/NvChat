import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TopGroupBar from "../TopGroupBar/TopGroupBar";
import MessageInput from "../global/MessageInput/MessageInput";
import MessagesList from "../global/MessagesList/MessagesList";
import { useGroup } from "context/GroupContext";
import EmojiPicker from "emoji-picker-react";
import { Close, ErrorRounded } from "@mui/icons-material";
import { useAuth } from "context/AuthContext";
import ApiService from "utils/ApiService";
import { TextMessage } from "types/AbstractMessage";
import { GroupMessageSerializer } from "types/GroupMessageSerializer";
import { useNavigate } from "react-router-dom";

type Props = {};

type Typing = {
  sender: string;
  message: string;
};

const GroupChatBox = (props: Props) => {
  const [message, setMessage] = useState<string | null>("");
  const [replyMessage, setReplyMessage] = useState(null);
  const [typing, setTyping] = useState<Typing | null>(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>();

  const msgRef = useRef<HTMLDivElement>(null);
  const { isRightOpen, toggle } = useGroup();

  const { selectedGroup, groupId, setGroups, groups, setSelectedGroup } =
    useGroup();
  const { userToken, userProfile, showBar } = useAuth();

  const [socket, setSocket] = useState<WebSocket>(null);

  useEffect(() => {
    const ws = new WebSocket(
      ApiService.wsEndPoint +
        `ws/group_chat/${selectedGroup.id}/?token=${userToken}`
    );
    setSocket(ws);
    return () => {
      ws.close();
    };
  }, []);

  const getUsername = () => {
    return userProfile.user.username;
  };

  useEffect(() => {
    if (socket) {
      socket.onopen = (e) => {
        console.log("WebSocket Established", { e });
      };
      socket.onmessage = (message) => {
        const messageData = JSON.parse(message.data);
        console.log(messageData);
        if (messageData.typing === true) {
          if (getUsername() !== messageData.sender) {
            setTyping({
              message: messageData.message,
              sender: messageData.sender,
            });
          }
        } else if (messageData.typing === false) {
          if (getUsername() !== messageData.sender) {
            setTyping(null);
          }
        } else if (messageData.updated && messageData.typing === undefined) {
          console.log(messageData);
        } else if (messageData.typing === undefined) {
          addNewMessage(messageData.message);
        }
      };

      socket.onclose = () => {
        console.log("WebSocket Client Disconnected");
        showBar("Websocket Disconnected", <ErrorRounded />, "error");
      };
      socket.onerror = (e) => {};
    }
  }, [socket]);

  const addNewMessage = (message: GroupMessageSerializer) => {
    const filteredGroupChat = groups.find(
      (group) => Number(group?.id) === Number(groupId)
    );
    // settings the new message as latest message and adding it the messages of the group
    filteredGroupChat.latest_message = message;
    filteredGroupChat.messages.push(message);

    const actualMessages = selectedGroup.messages;
    actualMessages.push(message);

    // setSelectedGroup({
    //   ...selectedGroup,
    //   latest_message: message,
    //   messages: actualMessages,
    // });

    // updating the group list

    const otherGroups = groups.filter(
      (group) => Number(group?.id) !== Number(groupId)
    );

    otherGroups.push(filteredGroupChat);

    setGroups(otherGroups);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message) {
      // const textMessage: TextMessage = {
      //   text: message,
      //   resourcetype: "TextMessage",
      // };
      const formData = new FormData();
      formData.append("text", message);
      formData.append("resourcetype", "TextMessage");
      ApiService.sendGroupMessage(formData, groupId, userToken)
        .then((res) => res.json())
        .then((data) => {
          socket.send(JSON.stringify({ message: data.data }));
        })
        .catch((err) => console.log(err));
      // webSocket.send(JSON.stringify({ message: textMessage }));
      setMessage("");
    }
  };

  const handleFileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.files);

    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
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
      setMessage("");

      ApiService.sendGroupMessage(formData, groupId, userToken)
        .then((res) => res.json())
        .then((data) => {
          socket.send(JSON.stringify({ message: data.data }));
        })
        .catch((err) => console.log(err));
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
    socket.send(
      JSON.stringify({ typing: true, message: `${getUsername()} is typing` })
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
      <TopGroupBar
        icon={selectedGroup.image}
        name={selectedGroup.chat_name}
        participants={selectedGroup.group_members}
        typing={typing}
        onClick={toggle}
      />
      <MessagesList
        messages={selectedGroup.messages}
        type="GROUP"
        onMsgClick={(message) => setReplyMessage(message)}
      />
      <MessageInput
        text={message}
        onChange={handleChange}
        onFileClick={handleFileClick}
        onSendClick={handleSend}
        onEmojiClick={handleEmogiClick}
        onKeyDown={handleKeydown}
        onBlur={handleKeyup}
        msgToReply={replyMessage}
        onCancleReplyMsg={() => setReplyMessage(null)}
      />
      <input
        style={{ display: "none" }}
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {/* {emojiOpen && (
        <Box sx={{ position: "absolute", bottom: "10%", left: "5%" }}>
          <Box position={"relative"}>
            <EmojiPicker
              // theme="dark"
              emojiStyle="native"
              onEmojiClick={(emogi, event) => {
                console.log(emoji, event);
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
      )} */}
    </Grid>
  );
};

// export default GroupChatBox;

const EmptyPage = () => {
  const { isRightOpen } = useGroup();
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
        Select a Group Chat and start discussion
      </Typography>
    </Grid>
  );
};

const GroupChat = () => {
  const { selectedGroup } = useGroup();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/auth/login");
    }
  }, []);

  if (selectedGroup) {
    return <GroupChatBox />;
  } else {
    return <EmptyPage />;
  }
};

export default GroupChat;
