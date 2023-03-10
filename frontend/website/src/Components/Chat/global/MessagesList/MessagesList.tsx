import { Box, Paper } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";

type Props = {};

const MessagesList = (props: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.messageList}>
      <Box className={classes.messageWrapper}>
        <Box component={Paper}>
          <code>from django.contrib.auth import get_user_model</code>
        </Box>
      </Box>
    </Box>
  );
};

export default MessagesList;
