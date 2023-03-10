import { Grid } from "@mui/material";
import React from "react";
import TopGroupBar from "../TopGroupBar/TopGroupBar";
import MessageInput from "../global/MessageInput/MessageInput";
import MessagesList from "../global/MessagesList/MessagesList";

type Props = {};

const GroupChat = (props: Props) => {
  return (
    <Grid
      item
      md={9}
      sm={8}
      sx={{ position: "relative", display: "flex", flexDirection: "column" }}
    >
      <TopGroupBar />
      <MessagesList />
      <MessageInput />
    </Grid>
  );
};

export default GroupChat;
