import { Grid } from "@mui/material";
import ChatRightbar from "Components/Chat/ChatRightbar/ChatRightbar";
import ChatSidebar from "Components/Chat/ChatSidebar/ChatSidebar";
import DiscussionChat from "Components/Chat/DiscussionChat/DiscussionChat";
import { useChat } from "context/ChatContext";
import React from "react";

type Props = {};

const discussion = (props: Props) => {
  const { isRightOpen } = useChat();

  return (
    <Grid container height={"100vh"} width={"100vw"}>
      <ChatSidebar />
      <DiscussionChat />
      {isRightOpen && <ChatRightbar />}
    </Grid>
  );
};

export default discussion;
