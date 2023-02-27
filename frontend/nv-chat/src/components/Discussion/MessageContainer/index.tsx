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
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        position: "relative",
        // overflowY:"auto",
        // overflowX:"none"
      }}
    >
      {messages?.map((msg, index) => (
        <Message message={msg} key={index} />
      ))}
    </Box>
  );
};

export default index;
