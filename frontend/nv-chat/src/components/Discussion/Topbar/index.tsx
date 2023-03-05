import { ArrowBack, MoreVert } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useChatContext } from "context/ChatContext";
import React, { useState } from "react";
import { MenuItem } from "react-pro-sidebar";
import { GroupMember } from "types/GroupMember";
import { UserProfile } from "types/UserProfile";

type Props = {
  chatType: "discussion" | "group";
  participants?: UserProfile[];
  members?: GroupMember[];
  name: string;
  imageUrl?: string;
};

const index = (props: Props) => {
  const {
    chatType = "discussion",
    participants,
    members,
    name,
    imageUrl,
  } = props;
  const { isRightOpen, toggleRight } = useChatContext();

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "#3b72c4",
        padding: theme.spacing(1),
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
      })}
    >
      <Box sx={(theme) => ({ display: "flex", alignItems: "center" })}>
        {isRightOpen && (
          <IconButton>
            <ArrowBack />
          </IconButton>
        )}
        <Avatar
          src="imageUrl"
          sx={{ cursor: "pointer" }}
          onClick={toggleRight}
        ></Avatar>
        <Typography sx={(theme) => ({ ml: theme.spacing(1), color: "#fff" })}>
          {name}
        </Typography>
      </Box>
      <Box>
        <IconButton size="small" sx={{ ml: 2, cursor: "pointer" }}>
          <MoreVert sx={{ width: 32, height: 32, color: "#fff" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default index;
