import { Box, Typography } from "@mui/material";
import React, { useRef } from "react";
import Message from "./Message";
// import { Message as MessageType } from "types/Message";
// import moment from "moment";
import { makeStyles } from "@mui/styles";

import ReactScrollable from "react-scrollable-feed";

type Props = {
  messages: any;
  ref: any;
};

const useStyles = makeStyles((theme) => ({
  data: {
    backgroundColor: "orange",
    textAlign: "center",
    widows: "initial",
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(0.5),
  },
  center: {
    display: "flex",
    alignSelf: "center",
  },
}));

const index = (props: Props) => {
  const { messages, ref } = props;
  const classes = useStyles();
  const bottomOfChat = useRef();

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        position: "relative",
        overflowY: "auto",
        mb: theme.spacing(10),
        scrollbarWidth: 2,
        scrollbarColor: theme.palette.primary.main,
      })}
    >
      {messages?.map((msg, index) => (
        <Message message={msg} key={index} />
      ))}
      <div ref={ref}></div>
    </Box>
  );
};

export default index;
