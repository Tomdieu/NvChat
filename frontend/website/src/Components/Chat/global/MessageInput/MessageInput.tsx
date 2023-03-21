import {
  Box,
  IconButton,
  InputBase,
  InputBaseProps,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useStyles } from "./styles";
import {
  AttachFile,
  Close,
  EmojiEmotions,
  Mic,
  Send,
} from "@mui/icons-material";
import { GroupMessageSerializer } from "types/GroupMessageSerializer";
import { Message } from "types/Message";
import GroupMessage from "../Message/GroupMessage";
import GroupMessageReply from "../Message/GroupMessageReply";

type Props = {
  text: string;
  msgToReply?: GroupMessageSerializer | Message;
  onFileClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onEmojiClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSendClick?: () => void;
  onInput?: (event: React.FormEvent<HTMLDivElement>) => void;
  onCancleReplyMsg?: () => void;
} & InputBaseProps;

const MessageInput = (props: Props) => {
  const {
    onFileClick,
    text,
    onChange,
    onInput,
    onEmojiClick,
    onSendClick,
    msgToReply,
    onCancleReplyMsg,
    ...other
  } = props;
  console.log("====================================");
  console.log({ msgToReply });
  console.log("====================================");
  const classes = useStyles();
  return (
    <Box className={classes.messageInput}>
      {msgToReply && (
        <Box
          flex={1}
          width={"100%"}
          sx={{ m: 0, p: 0, borderBottom: "2px solid #269bdf" }}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              bgcolor: "#f5f5f5",
              pt: 1,
              pb: 1,
              pl: 1,

              borderLeft: "5px solid #2a63df",
              borderRadius: "2px",
            }}
          >
            <Box>
              <Typography>
                Message To Reply With Id : {msgToReply.id}
              </Typography>
              <GroupMessageReply message={msgToReply} />
            </Box>
            <IconButton onClick={onCancleReplyMsg}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      )}
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
