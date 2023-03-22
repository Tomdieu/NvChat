import { Typography } from "@mui/material";
import { useAuth } from "context/AuthContext";
import { Message } from "types/Message";

type Props = {
  message: Message;
  style: React.CSSProperties;
};

const ChatLatestMessage = (props: Props) => {
  const { message, style } = props;
  const { userProfile } = useAuth();
  if (message?.message.resourcetype === "TextMessage") {
    return (
      <span
        // style={{
        //   color: "#2859e2",
        //   textOverflow: "ellipsis",
        //   maxWidth: "50px",
        //   flex: 1,
        // }}
        style={{
          ...{
            color: "#2859e2",
          },
          ...style,
        }}
      >
        {userProfile.user.username === message.sender.user.username
          ? `You : ${message.message.text.slice(0, 30)}`
          : `${message.sender.user.username} : ${message.message.text.slice(
              0,
              30
            )}`}{" "}
      </span>
    );
  }
  if (message?.message.resourcetype === "ImageMessage") {
    return (
      <span
        style={{
          ...{
            color: "#2859e2",
          },
          ...style,
        }}
      >
        {userProfile.user.username === message.sender.user.username
          ? "You: Send and image"
          : `${message.sender.user.username}: Send and image`}
      </span>
    );
  }

  if (message?.message.resourcetype === "VideoMessage") {
    return (
      <span
        style={{
          ...{
            color: "#2859e2",
          },
          ...style,
        }}
      >
        {userProfile.user.username === message.sender.user.username
          ? "You: Send a video"
          : `${message.sender.user.username}: Send a video`}
      </span>
    );
  }
  if (message?.message.resourcetype === "FileMessage") {
    return (
      <span
        style={{
          ...{
            color: "#2859e2",
          },
          ...style,
        }}
      >
        {userProfile.user.username === message.sender.user.username
          ? "You: Send a file"
          : `${message.sender.user.username}: Send a file`}
      </span>
    );
  }
};

export default ChatLatestMessage;
