import { AttachFile, EmojiEmotions, PhotoCamera, Send } from "@mui/icons-material";
import { Box, IconButton, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";

type Props = {};

const index = (props: Props) => {
  const [message,setMessage] = useState()
  const [text,setText] = useState();
  const [image,setImage] = useState();
  const [file,setFile] = useState();

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
        padding: theme.spacing(.5),
        borderRadius:20
      })}
    >
      <Box>
        <IconButton>
            <EmojiEmotions/>
        </IconButton>
      </Box>
      <Box sx={{ flex: 1, mx: 1, backgroundColor:'transparent',p:.5,borderRadius:5 }}>
        <InputBase
          fullWidth
          multiline
          maxRows={2}
          sx={(theme) => ({
            fontSize: 15,
            fontWeight: "600",
           
          })}
          placeholder={"Type your message"}
        />
      </Box>
      <Box>
        <IconButton>
          <AttachFile sx={{ width: 32, height: 32 }}/>
        </IconButton>
        <IconButton>
          <PhotoCamera sx={{ width: 32, height: 32 }}/>
        </IconButton>
        <IconButton>
          <Send sx={{ width: 32, height: 32 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default index;
