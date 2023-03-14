import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Typography,
  Dialog,
  Paper,
  TextField,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import {
  Cancel,
  GroupAdd,
  MoreVert,
  Save,
  Settings,
} from "@mui/icons-material";
import CreateGroupDialog from "../CreateGroupDialog";
import Group from "../Group/Group";
import { useGroup } from "Context/GroupContext";

type Props = {};

const GroupSidebar = (props: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { groups, setGroups, setSelectedGroup } = useGroup();
  useEffect(() => {
    // loads the groups
  }, []);
  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const menuOpen = Boolean(anchorEl);
  return (
    <Grid item md={3} sm={4} className={classes.sidebar}>
      <Box className={classes.sidebarWrapper}>
        <Box className={classes.sidebarTop}>
          <Typography variant={"h4"} className={classes.sidebarTitle}>
            Nv Chat
          </Typography>
          <IconButton
            id="chat-menu"
            onClick={handleClick}
            aria-controls={menuOpen ? "chat-menu" : undefined}
            aria-haspopup={"true"}
            aria-expanded={menuOpen ? "true" : undefined}
          >
            {/* <Settings /> */}
            <MoreVert />
          </IconButton>
        </Box>
        <Menu
          id="chat-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          MenuListProps={{ "aria-labelledby": "chat-menu" }}
          onClose={handleCloseMenu}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        >
          <MenuItem onClick={handleCloseMenu}>
            <Box
              display="flex"
              // justifyContent={"flex-end"}
              alignItems={"center"}
              gap={5}
              sx={{
                minWidth: "200px",
              }}
            >
              <Typography>New Group</Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <Box
              display="flex"
              // justifyContent={"flex-end"}
              alignItems={"center"}
              gap={5}
              sx={{
                minWidth: "200px",
              }}
            >
              <Typography>Profile</Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <Box
              display="flex"
              // justifyContent={"flex-end"}
              alignItems={"center"}
              gap={5}
              sx={{
                minWidth: "200px",
              }}
            >
              <Typography>Settings</Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <Box
              display="flex"
              // justifyContent={"flex-end"}
              alignItems={"center"}
              gap={5}
              sx={{
                minWidth: "200px",
              }}
            >
              <Typography>Logout</Typography>
            </Box>
          </MenuItem>
        </Menu>
        <CreateGroupDialog open={open} onClose={handleClose} />
        <Box className={classes.sidebarBottom}>
          <Box
            sx={{ position: "absolute", bottom: 10, right: 20, zIndex: 999 }}
          >
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                backgroundColor: "#0b66ef",
                p: 2,
                "&:active": { backgroundColor: "#0b66ef", opacity: 0.9 },
                "&:hover": { backgroundColor: "#0b66ef" },
              }}
            >
              <GroupAdd sx={{ width: 28, height: 28, color: "#fff" }} />
            </IconButton>
          </Box>
          <Box className={classes.groupList}>
            {groups?.map((group, index) => (
              <Group
                group={group}
                key={index}
                onClick={() => setSelectedGroup(group)}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default GroupSidebar;
