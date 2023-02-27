import {
  AttachFile,
  EmojiEmotions,
  PhotoCamera,
  Send,
} from "@mui/icons-material";
import { Box, IconButton, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";
import { TextMessage } from "types/AbstractMessage";

type Props = {
  handleSendMessage: (msg:TextMessage) => void;
};

const index = (props: Props) => {
  const [message, setMessage] = useState<null|TextMessage>(null);
  const [text, setText] = useState("");
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const { handleSendMessage } = props;
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSend = () => {
    if(text){
      const textMessage:TextMessage = {
        text: text,
        resourcetype: "TextMessage",
      }
      handleSendMessage(textMessage)
      setText("")
    }
  }
  return (
    <Box
      component={Paper}
      sx={(theme) => ({
        position: "absolute", 
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: theme.spacing(0.5),
        borderRadius: 20,
      })}
    >
      <Box>
        <IconButton>
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
          multiline
          maxRows={2}
          value={text}
          onChange={handleChange}
          sx={(theme) => ({
            fontSize: 15,
            fontWeight: "600",
          })}
          placeholder={"Type your message"}
        />
      </Box>
      <Box>
        <IconButton>
          <AttachFile sx={{ width: 32, height: 32 }} />
        </IconButton>
        <IconButton>
          <PhotoCamera sx={{ width: 32, height: 32 }} />
        </IconButton>
        <IconButton onClick={handleSend}>
          <Send sx={{ width: 32, height: 32 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default index;
