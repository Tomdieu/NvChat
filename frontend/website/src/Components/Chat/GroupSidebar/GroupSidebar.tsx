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
  CircularProgress,
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
import { useGroup } from "context/GroupContext";
import ApiService from "utils/ApiService";
import { GroupSerializer } from "types/GroupSerializer";

type Props = {};

const GroupSidebar = (props: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {
    groups,
    setGroups,
    selectedGroup,
    groupId,
    setSelectedGroup,
    setGroupId,
  } = useGroup();
  const [groupToDisplay, setGroupToDisplay] = useState<GroupSerializer[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      ApiService.getGroups(token)
        .then((res) => res.json())
        .then((data) => {
          setGroups(data.data);
          setLoading(false);
          if (selectedGroup) {
            const _groups: GroupSerializer[] = data.data;
            const _selectedGroup = _groups.find(
              (group) => group.id === selectedGroup.id
            );
            if (_selectedGroup) {
              setSelectedGroup(_selectedGroup);
            } else {
              localStorage.removeItem("selectedGroup");
              setSelectedGroup(null);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  const getLastestMessage = (group: GroupSerializer) => {
    return (
      (group.latest_message &&
        new Date(group.latest_message.message.created_at)) ||
      new Date(group.created_on)
    );
  };

  useEffect(() => {
    setGroupToDisplay(
      groups.sort((a, b) => {
        var keyA = getLastestMessage(a);
        var keyB = getLastestMessage(b);

        return keyB.getTime() - keyA.getTime();
      })
    );
  }, [groups, selectedGroup, groupId]);

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
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
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
            {loading ? (
              <center>
                <CircularProgress sx={{ color: "#fff" }} />
              </center>
            ) : (
              <>
                {groupToDisplay?.map((group, index) => (
                  <Group
                    group={group}
                    key={index}
                    onClick={() => {
                      setSelectedGroup(group);
                      setGroupId(group.id);
                    }}
                  />
                ))}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default GroupSidebar;
