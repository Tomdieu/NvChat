import TopChatBar from "components/TopChatBar";
import { useChatContext } from "context/ChatContext";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import MessageContainer from "components/Discussion/MessageContainer";
import InputMessageContainer from "components/Discussion/InputMessageContainer";
import { Box } from "@mui/material";
import { useAuthContext } from "context/AuthContext";
import ApiService from "utils/ApiService";
import { TextMessage, VideoMessage } from "types/AbstractMessage";
import { Conversation } from "types/ConversationSerializer";
import { Message } from "types/Message";

import "./index.css";
import { ROUTES } from "@constants";

type Props = {};

const index = (props: Props) => {
  const { id } = useParams();
  const {
    selectedChatType,
    setSelectedChatType,
    selectedDiscussion,
    setSelectedDiscussion,
    discussionsList,
    setDiscussionsList,
  } = useChatContext();
  const bottomOfChat = useRef();
  const navigate = useNavigate();
  const { userToken, userProfile } = useAuthContext();

  const [loading, setLoading] = useState<Boolean>(false);

  const [typing, setTyping] = useState("");

  const [chat, setChat] = useState({
    name: (selectedDiscussion && selectedDiscussion.title) || "",
    messages: (selectedDiscussion && selectedDiscussion.messages) || [],
    type: selectedChatType || "dicussion",
    icon: null,
    participants: [],
  });

  const loadData = () => {
    ApiService.getDiscussion(userToken, Number(id))
      .then((res) => res.json())
      .then((data) => {
        // console.log("Results : ", data);
        setChat({
          ...chat,
          name: data.title,
          messages: data.messages,
          icon: data.imageUrl,
          participants: data.participants,
        });
        setSelectedDiscussion(data);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (userToken) {
      setLoading(true);

      loadData();
    }
  }, []);

  // console.log({ chat });

  useEffect(() => {
    if (!chat.name) {
      return loadData();
    }
    setTimeout(() => {
      bottomOfChat.current.scrollIntoView({
        behavior: "smoot",
        block: "start",
      });
    }, 100);
  }, [chat]);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [text, setText] = useState("");
  // const [message, setMessage] = useState(null);
  // const messages = selectedDiscussion && selectedDiscussion.messages;
  // const name = selectedDiscussion && selectedDiscussion.title;
  // const [replyMessage, setReplyMessage] = useState(null);
  // if (!userToken) {
  //   navigate(ROUTES.LOGIN);
  // }
  const webSocket = new WebSocket(
    ApiService.wsEndPoint + `ws/discussion_chat/${id}/?token=${userToken}`
  );
  useEffect(() => {
    webSocket.onopen = (e) => {
      console.log("WebSocket Established", { e });
    };
    webSocket.onmessage = (message) => {
      console.log("Recieve Message : ", { message });
      const messageData = JSON.parse(message.data);
      // console.log("Recieve Message : ");
      // console.log(messageData.message)
      if (messageData.typing) {
        if (messageData.typing && messageData.typing === true) {
          // console.log(messageData.message);
          console.log("T : ", { messageData });
          setTyping(messageData.message);
        } else if (messageData.typing && messageData.typing === false) {
          console.log("Nt : ", { messageData });
          // console.log(messageData.message);

          setTyping("");
        }
      } else {
        addRecieveMessage(messageData.message);
      }
    };
    webSocket.onclose = () => {
      console.log("WebSocket Client Disconnected");
    };
  }, []);

  const addRecieveMessage = (newMessage: Message) => {
    const oldMessages = chat.messages;
    oldMessages.push(newMessage);
    // setChat({ ...chat, messages:  });

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

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Up");
    if (e.key === "Enter") {
      return handleSend();
    }
    return handleNotTyping();
  };

  const handleNotTyping = () => {
    webSocket.readyState;
    if (webSocket.OPEN === webSocket.readyState) {
      webSocket.send(
        JSON.stringify({
          message: ``,
          typing: false,
        })
      );
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

  const handleTyping = () => {
    console.log("Websocket ReadyState : ", webSocket.readyState);
    if (webSocket.OPEN === webSocket.readyState) {
      webSocket.send(
        JSON.stringify({
          message: `${userProfile.user.username} is typing`,
          typing: true,
        })
      );
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
    return handleTyping();
  };

  const handleFileSelected = (event) => {
    const files = event.target.files;
    console.log(files, files.length);
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const fileName = file.name.toLowerCase();

      const reader = new FileReader();

      reader.onload = () => {
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
            video: reader.result,
            caption: text || null,
            resourcetype: "VideoMessage",
          };
          // console.log(videoMessage);
          webSocket.send(
            JSON.stringify({ message: videoMessage, filename: fileName })
          );
        }
        if (isImage) {
          const imageMessage = {
            image: reader.result,
            caption: text || null,
            resourcetype: "ImageMessage",
          };
          // console.log(imageMessage);
          webSocket.send(
            JSON.stringify({ message: imageMessage, filename: fileName })
          );
        }

        if (!isImage && !isVideo) {
          const fileMessage = {
            file: reader.result,
            caption: text || null,
            resourcetype: "FileMessage",
          };
          webSocket.send(
            JSON.stringify({ message: fileMessage, filename: fileName })
          );
        }
      };

      reader.readAsDataURL(file);
    }
    // Do something with the selected files
  };

  const handleImageSelected = (event) => {
    const images = event.target.files;
    // console.log(images, images.length);
    for (let index = 0; index < images.length; index++) {
      const image = images[index];
      const fileName = image.name.toLowerCase();
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
      // console.log(image, fileName, isImage, isVideo);

      const reader = new FileReader();

      reader.onload = () => {
        // console.log(reader.result);
        if (isVideo) {
          const videoMessage = {
            video: reader.result,
            caption: text || null,
            resourcetype: "VideoMessage",
          };
          // console.log(videoMessage);
          webSocket.send(
            JSON.stringify({ message: videoMessage, filename: fileName })
          );
        }
        if (isImage) {
          const imageMessage = {
            image: reader.result,
            caption: text || null,
            resourcetype: "ImageMessage",
          };
          // console.log(imageMessage);
          webSocket.send(
            JSON.stringify({ message: imageMessage, filename: fileName })
          );
        }
      };

      reader.readAsDataURL(image);
    }

    // Do something with the selected images
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageButtonClick = () => {
    imageInputRef.current.click();
  };

  if (loading) {
    return (
      <Box
        width={"100%"}
        height={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flex={1}
      >
        <Box
          sx={(theme) => ({
            width: 200,
            height: 200,
            border: "16px solid #ddd",
            borderRadius: "50%",
            borderTopColor: "#2f90dfdd",
            animation: "spin 1s infinite",
          })}
        ></Box>
      </Box>
    );
  }

  return (
    // <>
    //   {chat.name ? (

    //   ) : null}
    // </>
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
      <TopChatBar
        typing={typing}
        chatType={chat.type}
        name={chat.name}
        icon={chat.icon}
      />
      <MessageContainer messages={chat.messages} ref={bottomOfChat} />
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
