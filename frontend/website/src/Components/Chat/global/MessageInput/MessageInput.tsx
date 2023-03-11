import { Box, IconButton, InputBase, TextField } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";
import { AttachFile, EmojiEmotions, Mic, Send } from "@mui/icons-material";

type Props = {
  text: string;
  onFileClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onEmogiClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const MessageInput = (props: Props) => {
  const { onFileClick, text, onChange, onEmogiClick } = props;
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
            value={text}
            onChange={onChange}
            placeholder="Type a message"
            sx={(theme) => ({
              paddingLeft: theme.spacing(0.5),
              // p: theme.spacing(1),
              fontSize: 16,
              lineHeight: "32px",
            })}
          />
        </Box>
        <Box className={classes.iconContainer}>
          <IconButton className={classes.iconButton} onClick={onFileClick}>
            <AttachFile
              className={classes.icon}
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
          {text ? (
            <IconButton className={classes.iconButton}>
              <Send className={classes.icon} sx={{ width: 32, height: 32 }} />
            </IconButton>
          ) : (
            <IconButton className={classes.iconButton}>
              <Mic className={classes.icon} sx={{ width: 32, height: 32 }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MessageInput;
