import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useAuthContext } from "context/AuthContext";

type Props = {
  message: any;
};

const Message = (props: Props) => {
  const { message } = props;
  const { userProfile } = useAuthContext();
  const isSender = message.sender.user.username === userProfile.user.username;
  return (
    <>
      {isSender ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: isSender ? "flex-end" : "flex-start",
            padding: "9px 5px",
          }}
        >
          <Box
            component={Paper}
            sx={(theme) => ({
              position: "relative",
              bgcolor: "#fff",
              borderRadius: theme.shape.borderRadius,
              mr: 1,
              maxWidth: "60%",
              // p: 2,
            })}
          >
            {message.message.resourcetype === "TextMessage" ? (
              <Typography
                variant="h6"
                sx={(theme) => ({ px: theme.spacing(1) })}
              >
                {message.message.text}
              </Typography>
            ) : null}
          </Box>
          <Avatar
            src={message.sender.profile_picture}
            alt={message.sender.user.username}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: isSender ? "flex-end" : "flex-start",
            padding: "9px 5px",
          }}
        >
          <Avatar
            src={message.sender.profile_picture}
            alt={message.sender.user.username}
          />

          <Box
            component={Paper}
            sx={(theme) => ({
              position: "relative",
              bgcolor: "#fff",
              borderRadius: theme.shape.borderRadius,
              float: "right",
              ml: 1,
              maxWidth: "60%",
            })}
          >
            {message.message.resourcetype === "TextMessage" ? (
              <Typography
                variant="h6"
                sx={(theme) => ({ px: theme.spacing(1) })}
              >
                {message.message.text}
              </Typography>
            ) : null}
          </Box>
        </div>
      )}
    </>
  );
};

export default Message;
