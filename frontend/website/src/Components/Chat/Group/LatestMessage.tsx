import { span } from "@mui/material";
import { useAuth } from "Context/AuthContext";
import React from "react";
import { GroupMessageSerializer } from "types/GroupMessageSerializer";

type Props = {
  message: GroupMessageSerializer;
};

const LatestMessage = (props: Props) => {
  const { message } = props;
  const { userProfile } = useAuth();
  if (message.message.resourcetype === "TextMessage") {
    return (
      <span
        style={{
          color: "lightgrey",
          fontSize: "1.3em",
        }}
      >
        {userProfile.user.username === message.sender.user.username ? (
          <span>{`You : ${message.message.text}`}</span>
        ) : (
          <span>{`${message.sender.user.username} : ${message.message.text}`}</span>
        )}
      </span>
    );
  }
  if (message.message.resourcetype === "ImageMessage") {
    return (
      <span
        style={{
          color: "lightgrey",
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
          color: "lightgrey",
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
          color: "lightgrey",
        }}
      >
        {userProfile.user.username === message.sender.user.username
          ? "You: Send a file"
          : `${message.sender.user.username}: Send a file`}
      </span>
    );
  }
  return <div>LatestMessage</div>;
};

export default LatestMessage;
