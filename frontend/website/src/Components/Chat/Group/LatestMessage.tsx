import { useAuth } from "context/AuthContext";
import React from "react";
import { GroupMessageSerializer } from "types/GroupMessageSerializer";

type Props = {
  message: GroupMessageSerializer;
  style: React.CSSProperties;
};

const LatestMessage = (props: Props) => {
  const { message, style } = props;
  const { userProfile } = useAuth();
  if (message.message.resourcetype === "TextMessage") {
    return (
      <span
        style={{
          ...{
            color: "#2859e2",
            fontSize: "1.3em",
          },
          ...style,
        }}
      >
        {userProfile.user.username === message.sender.user.username
          ? `You : ${message.message.text}`
          : `${message.sender.user.username} : ${message.message.text}`}
      </span>
    );
  }
  if (message.message.resourcetype === "ImageMessage") {
    return (
      <span
        style={{
          ...{
            color: "#2859e2",
            fontSize: "1.3em",
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

  if (message.message.resourcetype === "VideoMessage") {
    return (
      <span
        style={{
          ...{
            color: "#2859e2",
            fontSize: "1.3em",
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
  if (message.message.resourcetype === "FileMessage") {
    return (
      <span
        style={{
          ...{
            color: "#2859e2",
            fontSize: "1.3em",
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

export default LatestMessage;
