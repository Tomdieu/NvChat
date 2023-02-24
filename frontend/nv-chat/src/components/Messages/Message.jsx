import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import React from "react";

import { makeStyles } from "@mui/styles";
import { MoreVert } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(1),
    maxWidth: "60%",
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(1),
    backgroundColor: 'red',

    // backgroundColor: theme.palette.background.default,
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      color:'red',
      [(props) => (props.isSentByCurrentUser ? "right" : "left")]: "0",
      borderTop: `10px solid ${theme.palette.background.default}`,
      borderRight: `10px solid ${theme.palette.background.default}`,
      borderBottom: `10px solid ${theme.palette.background.default}`,
      borderLeft: `10px solid ${theme.palette.background.default}`,
      transform: `translate(${(props) =>
        props.isSentByCurrentUser ? "50%" : "-50%"}, -50%) rotate(${(props) =>
        props.isSentByCurrentUser ? "45deg" : "-45deg"})`,
    },
    [(props) => (props.isSentByCurrentUser ? "marginLeft" : "marginRight")]:
      "auto",
  },
  messageHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
}));

const Message = (props) => {
  const { msg, style } = props;
  const classes = useStyles({
    isSentByCurrentUser: msg.sender.user.username === "ivantom",
  });
  return (
    <Paper className={[classes.root, style]}>
      <div className={classes.messageHeader}>
        <Box sx={(theme) => ({ display: "flex", alignItems: "center" })}>
          <Avatar
            src={""}
            alt={`${msg.sender.user.username} profile picture`}
            className={classes.avatar}
          />
          <Typography variant="subtitle1">
            {msg.sender.user.username}
          </Typography>
        </Box>
        {msg.sender.user.username === "ivantom" && (
          <IconButton>
            <MoreVert />
          </IconButton>
        )}
      </div>
      <Typography variant="body1">{msg.message.text}</Typography>
      <Typography variant="caption" color="textSecondary">
        {msg.message.created_at}
      </Typography>
    </Paper>
    // <Box>

    //     <Typography>{msg.sender.user.username}</Typography>
    //     <Typography>{msg.message.text}</Typography>

    // </Box>
  );
};

export default Message;
