import {
  Box,
  IconButton,
  InputBase,
  InputBaseProps,
  TextField,
} from "@mui/material";
import React from "react";
import { useStyles } from "./styles";
import { AttachFile, EmojiEmotions, Mic, Send } from "@mui/icons-material";

type Props = {
  text: string;
  onFileClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onEmojiClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSendClick?: () => void;
  onInput?: (event: React.FormEventHandler<HTMLDivElement>) => void;
} & InputBaseProps;

const MessageInput = (props: Props) => {
  const {
    onFileClick,
    text,
    onChange,
    onInput,
    onEmojiClick,
    onSendClick,
    ...other
  } = props;
  const classes = useStyles();
  return (
    <Box className={classes.messageInput}>
      {/* <Box></Box> */}
      <Box className={classes.messageInputWrapper}>
        <IconButton className={classes.iconButton} onClick={onEmojiClick}>
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
            onInput={onInput}
            placeholder="Type a message"
            sx={(theme) => ({
              paddingLeft: theme.spacing(0.5),
              // p: theme.spacing(1),
              fontSize: 16,
              lineHeight: "32px",
            })}
            {...other}
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
            <IconButton className={classes.iconButton} onClick={onSendClick}>
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
