import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import GroupIcon from "@mui/icons-material/Group";
import PostIcon from "@mui/icons-material/PostAdd";
import FriendsIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BtnOption from "./BtnOption";
import { useChatContext } from "context/ChatContext";

type Props = {
  height: number | string;
};

const Index = (props: Props) => {
  const { selectedButton, handleClick } = useChatContext();
  const { height = "10%" } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "space-between",
        scrollbarWidth: "2",
        "::-webkit-scrollbar": {
          display: "none",
        },
        width: "100%",
        height: height,
        overflowWrap: "auto",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          borderTopRightRadius: theme.shape.borderRadius,
          borderTopLeftRadius: theme.shape.borderRadius,
          backgroundColor: "#fff",

          justifyContent: "space-between",
          padding: theme.spacing(1),
        })}
      >
        <BtnOption
          selected={selectedButton === "chat"}
          onClick={() => handleClick("chat")}
        >
          <ChatIcon />
        </BtnOption>
        <BtnOption
          selected={selectedButton === "group"}
          onClick={() => handleClick("group")}
        >
          <GroupIcon />
        </BtnOption>
        <BtnOption
          selected={selectedButton === "post"}
          onClick={() => handleClick("post")}
        >
          <PostIcon />
        </BtnOption>
        <BtnOption
          selected={selectedButton === "friends"}
          onClick={() => handleClick("friends")}
        >
          <FriendsIcon />
        </BtnOption>
        <BtnOption
          selected={selectedButton === "settings"}
          onClick={() => handleClick("settings")}
        >
          <SettingsIcon />
        </BtnOption>
        <BtnOption
          selected={selectedButton === "notifications"}
          onClick={() => handleClick("notifications")}
        >
          <NotificationsIcon />
        </BtnOption>
      </Box>
    </Box>
  );
};

export default Index;
