import { Box, IconButton, InputBase, TextField } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";
import {
  AttachFile,
  AudioFile,
  EmojiEmotions,
  Send,
} from "@mui/icons-material";

type Props = {};

const MessageInput = (props: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.messageInput}>
      {/* <Box></Box> */}
      <Box className={classes.messageInputWrapper}>
        <IconButton className={classes.iconButton}>
          <EmojiEmotions
            className={classes.icon}
            sx={{ width: 32, height: 32 }}
          />
        </IconButton>
        <Box className={classes.inputWrapper}>
          <InputBase
            className={classes.input}
            multiline
            maxRows={3}
            fullWidth
            sx={(theme) => ({
              px: theme.spacing(2),
              py: theme.spacing(1),
              scrollbarWidth: 3,
              scrollbarColor: "green",
              fontSize: 30,
              fontWeight: "100",
            })}
          />
        </Box>
        <Box className={classes.iconContainer}>
          <IconButton className={classes.iconButton}>
            <AttachFile
              className={classes.icon}
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <Send className={classes.icon} sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageInput;
