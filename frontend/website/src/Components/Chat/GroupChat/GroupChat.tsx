import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TopGroupBar from "../TopGroupBar/TopGroupBar";
import MessageInput from "../global/MessageInput/MessageInput";
import MessagesList from "../global/MessagesList/MessagesList";
import { useGroup } from "Context/GroupContext";
import EmojiPicker from "emoji-picker-react";
import { Close, ErrorRounded } from "@mui/icons-material";
import { useAuth } from "Context/AuthContext";
import ApiService from "Utils/ApiService";
import { TextMessage } from "types/AbstractMessage";
import { GroupMessageSerializer } from "types/GroupMessageSerializer";

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

  const getUsername = () => {
    return userProfile.user.username;
  };

  let webSocket = new WebSocket(
    ApiService.wsEndPoint + `ws/group_chat/${groupId}/?token=${userToken}`
  );

  useEffect(() => {
    webSocket.onopen = (e) => {
      console.log("WebSocket Established", { e });
    };
    webSocket.onmessage = (message) => {
      const messageData = JSON.parse(message.data);
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
      } else if (messageData.typing === undefined) {
        console.log("====================================");
        console.log("Case 3");
        console.log("====================================");

        const groupMessage: GroupMessageSerializer = messageData.message;
        addNewMessage(groupMessage);
      }
    };

    webSocket.onclose = () => {
      console.log("WebSocket Client Disconnected");
      showBar("Websocket Disconnected", <ErrorRounded />, "error");
    };
    webSocket.onerror = (e) => {
      webSocket = new WebSocket(
        ApiService.wsEndPoint + `ws/group_chat/${groupId}/?token=${userToken}`
      );
    };
  }, []);

  const addNewMessage = (message: GroupMessageSerializer) => {
    const filteredGroupChat = groups.find(
      (group) => Number(group.id) === Number(groupId)
    );
    // settings the new message as latest message and adding it the messages of the group
    filteredGroupChat.latest_message = message;
    filteredGroupChat.messages.push(message);

    const actualMessages = selectedGroup.messages;
    actualMessages.push(message);

    setSelectedGroup({
      ...selectedGroup,
      latest_message: message,
      messages: actualMessages,
    });

    // updating the group list

    const otherGroups = groups.filter(
      (group) => Number(group.id) !== Number(groupId)
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
      const textMessage: TextMessage = {
        text: message,
        resourcetype: "TextMessage",
      };

      webSocket.send(JSON.stringify({ message: textMessage }));
      setMessage("");
    }
  };

  const handleFileClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.files);

    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const fileName = file.name.toLowerCase();

      const fileReader = new FileReader();

      fileReader.onload = (ev: ProgressEvent<FileReader>) => {
        const dataUrl = fileReader.result;
        console.log(dataUrl);

        const isImage =
          fileName.endsWith(".jpg") ||
          fileName.endsWith(".jpeg") ||
          fileName.endsWith(".png") ||
          fileName.endsWith(".gif");
        const isVideo =
          fileName.endsWith(".mp4") ||
          fileName.endsWith(".mov") ||
          fileName.endsWith(".avi") ||
          fileName.endsWith(".wmv");

        if (isVideo) {
          const videoMessage = {
            video: fileReader.result,
            caption: message || null,
            resourcetype: "VideoMessage",
          };
          // console.log(videoMessage);
          webSocket.send(
            JSON.stringify({ message: videoMessage, filename: fileName })
          );
        }
        if (isImage) {
          const imageMessage = {
            image: fileReader.result,
            caption: message || null,
            resourcetype: "ImageMessage",
          };
          // console.log(imageMessage);
          webSocket.send(
            JSON.stringify({ message: imageMessage, filename: fileName })
          );
        }

        if (!isImage && !isVideo) {
          const fileMessage = {
            file: fileReader.result,
            caption: message || null,
            resourcetype: "FileMessage",
          };
          webSocket.send(
            JSON.stringify({ message: fileMessage, filename: fileName })
          );
        }
      };

      fileReader.readAsDataURL(file);
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
    webSocket.send(
      JSON.stringify({ typing: true, message: `${getUsername()} is typing` })
    );
  };
  const handleKeyup = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    webSocket.send(JSON.stringify({ typing: false, message: `` }));
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
      <MessagesList messages={selectedGroup.messages} />
      <MessageInput
        text={message}
        onChange={handleChange}
        onFileClick={handleFileClick}
        onSendClick={handleSend}
        onEmojiClick={handleEmogiClick}
        onKeyDown={handleKeydown}
        onBlur={handleKeyup}
      />
      <input
        style={{ display: "none" }}
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {emojiOpen && (
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
      )}
    </Grid>
  );
};

// export default GroupChatBox;

const EmptyPage = () => {
  const { isRightOpen } = useGroup();
  return (
    <Grid
      item
      md={isRightOpen ? 9 : 6}
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

  if (selectedGroup) {
    return <GroupChatBox />;
  } else {
    return <EmptyPage />;
  }
};

export default GroupChat;
