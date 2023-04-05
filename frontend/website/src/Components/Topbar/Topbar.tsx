import {
  Avatar,
  Box,
  Button,
  InputBase,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import { Search, Message, Notifications, Person } from "@mui/icons-material";
import { useStyles } from "./styles";
import { BsDot } from "react-icons/bs";

type Props = {};

const Topbar = (props: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.container} id="topBar">
      <Box className={classes.leftContainer}>
        <Typography
          sx={(theme) => ({
            fontWeight: "bold",
            cursor: "pointer",
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          })}
          variant="h4"
        >
          <span style={{ color: "#599ee3" }}>N</span>v{" "}
          <span style={{ color: "tomato" }}>S</span>ocial
        </Typography>
        <Typography
          sx={(theme) => ({
            fontWeight: "bold",
            cursor: "pointer",
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
          })}
          variant="h4"
        >
          <span style={{ color: "#599ee3" }}>N</span>{" "}
          <span style={{ color: "tomato" }}>S</span>
        </Typography>
      </Box>

      <Box className={classes.centerContainer}>
        <Box className={classes.searchWrapper}>
          <Search />
          <InputBase
            className={classes.searchInput}
            placeholder="Search friend post image or video"
            fullWidth
          />
        </Box>
      </Box>
      <Box className={classes.rightContainer}>
        {/* <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>HomePage</Typography>
        </Box> */}
        <Box className={classes.iconList}>
          <IconButton className={classes.iconButton}>
            <Person
              className={classes.icon}
              sx={{ width: "32px", height: "32px" }}
            />
            {/* <span className={classes.notificationBadge}>1</span> */}
          </IconButton>
          <IconButton>
            <Message
              className={classes.icon}
              sx={{ width: "32px", height: "32px" }}
            />
            {/* <span className={classes.notificationBadge}>1</span> */}
          </IconButton>
          <IconButton>
            <Notifications
              className={classes.icon}
              sx={{ width: "32px", height: "32px" }}
            />
            {/* <span className={classes.notificationBadge}>1</span> */}
          </IconButton>
        </Box>
        <Avatar className={classes.avatar} />
      </Box>
    </Box>
  );
};

export default Topbar;
