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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import { Cancel, GroupAdd, Save, Settings } from "@mui/icons-material";
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
  return (
    <Grid item md={3} sm={4} className={classes.sidebar}>
      <Box className={classes.sidebarWrapper}>
        <Box className={classes.sidebarTop}>
          <Typography variant={"h4"} className={classes.sidebarTitle}>
            Nv Chat
          </Typography>
          <IconButton>
            <Settings />
          </IconButton>
        </Box>
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
