import {
  AttachFile,
  EmojiEmotions,
  PhotoCamera,
  Send,
} from "@mui/icons-material";
import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { TextMessage } from "types/AbstractMessage";

type Props = {
  handleSendMessage: (msg: TextMessage) => void;
  value: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyUp?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFileClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onImageClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onEmogiClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const index = (props: Props) => {
  const {
    handleSendMessage,
    value = "",
    onChange,
    onKeyUp,
    onClick,
    onKeyDown,
    onFileClick,
    onImageClick,
    onEmogiClick,
  } = props;

  return (
    <Box
      component={Paper}
      sx={(theme) => ({
        position: "absolute",
        bottom: theme.spacing(1),
        left: theme.spacing(1),
        right: theme.spacing(1),
        // borderRadius: 20,
      })}
    >
      {/* <Box  sx={{borderRadius:0}}>
        <Typography sx={(theme)=>({p:theme.spacing(1)})}>ivantom</Typography>
        <Typography noWrap sx={(theme)=>({p:theme.spacing(1)})}>text asdkajsdkjas daksdbkasbda sdakjsdbas daksjdnkajsd aksdj text asdkajsdkjas daksdbkasbda sdakjsdbas daksjdnkajsd aksdjtext asdkajsdkjas daksdbkasbda sdakjsdbas daksjdnkajsd aksdjtext asdkajsdkjas daksdbkasbda sdakjsdbas daksjdnkajsd aksdj text asdkajsdkjas daksdbkasbda sdakjsdbas daksjdnkajsd aksdjbaksjd a sdkajsdkjabskd askdjbasjd kas dajsbdka sdka skdjajsbdkasd kajsbdaksjd</Typography>
      </Box> */}
      <Box
        sx={(theme) => ({
          display: "flex",
          // alignItems: "center",
          justifyContent: "center",
          padding: theme.spacing(0.5),
        })}
      >
        <Box>
          <IconButton onClick={onEmogiClick}>
            <EmojiEmotions />
          </IconButton>
        </Box>
        <Box
          sx={{
            flex: 1,
            mx: 1,
            backgroundColor: "transparent",
            p: 0.5,
            borderRadius: 5,
          }}
        >
          <InputBase
            fullWidth
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            multiline
            maxRows={5}
            sx={(theme) => ({
              fontSize: 15,
              fontWeight: "600",
            })}
            name="text"
            placeholder={"Type your message"}
          />
        </Box>
        <Box>
          <IconButton onClick={onFileClick}>
            <AttachFile sx={{ width: 32, height: 32 }} />
          </IconButton>
          <IconButton onClick={onImageClick}>
            <PhotoCamera sx={{ width: 32, height: 32 }} />
          </IconButton>
          <IconButton onClick={onClick}>
            <Send sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default index;
