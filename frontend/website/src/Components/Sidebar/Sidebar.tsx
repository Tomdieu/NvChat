import React from "react";
import { useStyles } from "./styles";
import {
  RssFeed,
  Group,
  VideoChat,
  Chat,
  PeopleOutline,
} from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {};

const Sidebar = (props: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.sidebarContainer}>
      <div className={classes.sidebarWrapper}>
        <ul className={classes.sidebarList}>
          <li className={classes.sidebarListItem} onClick={() => navigate("/")}>
            <RssFeed className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Post</span>
          </li>
          <li
            className={classes.sidebarListItem}
            onClick={() => navigate("/discussion")}
          >
            <Chat className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Chats</span>
          </li>
          <li
            className={classes.sidebarListItem}
            onClick={() => navigate("/groups")}
          >
            <Group className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Groups</span>
          </li>
          <li className={classes.sidebarListItem}>
            <VideoChat className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Video</span>
          </li>
          <li className={classes.sidebarListItem}>
            <PeopleOutline className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Friends</span>
          </li>
        </ul>
        <hr />
        <ul className={classes.sidebarFriendList}>
          <li className={classes.sidebarFriend}>
            <Avatar className={classes.sidebarFriendImg} />
            <span className={classes.sidebarFriendName}>Ivan Tom</span>
          </li>

          <Button variant={"contained"} fullWidth>
            Show More
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
