import { Box } from "@mui/material";
import React  from "react";
import Message from "./Message";

type Props = {
  messages: [];
};

const index = (props: Props) => {
  const { messages } = props;
  return (
    <Box
      sx={(theme)=>(
        {
          display: "flex",
          flexDirection: "column",
          flex: 1,
          width: "100%",
          position: "relative",
          overflowY:"auto",
          mb:theme.spacing(10),
          scrollbarWidth:2
          // overflowX:"none"
        }
      )}
    >
      {messages?.map((msg, index) => (
        <Message message={msg} key={index} />
      ))}
    </Box>
  );
};

export default index;
