import { Grid } from "@mui/material";
import { useChat } from "context/ChatContext";
import React from "react";

type Props = {};

const ChatRightbar = (props: Props) => {
  const { isRightOpen } = useChat();
  return (
    <Grid item md={isRightOpen ? 3 : 0} display={isRightOpen ? "flex" : "none"}>
      ChatRightbar
    </Grid>
  );
};

export default React.memo(ChatRightbar);
