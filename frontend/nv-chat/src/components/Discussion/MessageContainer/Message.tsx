import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useAuthContext } from "context/AuthContext";
import { makeStyles } from "@mui/styles";
import moment from "moment";

type Props = {
  message: any;
};

const useStyles = makeStyles((theme) => ({
  image: {
    width: 400,
    height: 500,
    maxWidth: 500,
    maxHeight: 500,
  },
  span: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

const Message = (props: Props) => {
  const { message } = props;
  const { userProfile } = useAuthContext();
  const classes = useStyles();
  const isSender = message.sender.user.username === userProfile.user.username;
  return (
    <>
      {isSender ? (
        <div
          style={{
            display: "flex",
            // alignItems: "center",
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
              <>
                <Typography
                  variant="h6"
                  sx={(theme) => ({
                    px: theme.spacing(1),
                    overflow: "wrap",
                    wordWrap: "break-word",
                  })}
                >
                  {message.message.text}
                </Typography>
                <span className={classes.span}>
                  {moment(message.message.created_at).format("HH:mm")}
                </span>
              </>
            ) : null}
            {message.message.resourcetype === "ImageMessage" && (
              <Box
                sx={(theme) => ({
                  margin: theme.spacing(1),
                  cursor: "pointer",
                })}
              >
                <img
                  src={message.message.image}
                  alt={""}
                  className={classes.image}
                />
                {message.message.caption && (
                  <Typography sx={(theme) => ({ margin: theme.spacing(1) })}>
                    {message.message.caption}
                  </Typography>
                )}
                <span className={classes.span}>
                  {moment(message.message.created_at).format("HH:mm")}
                </span>
              </Box>
            )}
          </Box>
          {/* {message.sender.profile_picture ? (
            <Avatar
              src={message.sender.profile_picture}
              alt={message.sender.user.username}
            />
          ) : (
            <Avatar>{message.sender.user.username.charAt(0)}</Avatar>
          )} */}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            // alignItems: "center",
            width: "100%",
            justifyContent: isSender ? "flex-end" : "flex-start",
            padding: "9px 5px",
          }}
        >
          {message.sender.profile_picture ? (
            <Avatar
              src={message.sender.profile_picture}
              alt={message.sender.user.username}
              sx={{ cursor: "pointer" }}
            />
          ) : (
            <Avatar sx={{ bgcolor: "tomato", cursor: "pointer" }}>
              {message.sender.user.username.charAt(0)}
            </Avatar>
          )}

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
              <>
                <Typography
                  variant="h6"
                  sx={(theme) => ({
                    px: theme.spacing(1),
                    overflow: "wrap",
                    wordWrap: "break-word",
                  })}
                >
                  {message.message.text}
                </Typography>
                <span className={classes.span}>
                  {moment(message.message.created_at).format("HH:mm")}
                </span>
              </>
            ) : null}
            {message.message.resourcetype === "ImageMessage" && (
              <Box sx={(theme) => ({ margin: theme.spacing(1) })}>
                <img
                  src={message.message.image}
                  alt={""}
                  className={classes.image}
                />
                {message.message.caption && (
                  <Typography sx={(theme) => ({ margin: theme.spacing(1) })}>
                    {message.message.caption}
                  </Typography>
                )}
                <span className={classes.span}>
                  {moment(message.message.created_at).format("HH:mm")}
                </span>
              </Box>
            )}
          </Box>
        </div>
      )}
    </>
  );
};

export default Message;
