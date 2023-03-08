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

type Props = {};

const Topbar = (props: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.leftContainer}>
        <Typography
          sx={{
            // fontFamily: "poppins",
            // fontSize: "2rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          variant="h4"
        >
          <span style={{ color: "#599ee3" }}>N</span>v{" "}
          <span style={{ color: "tomato" }}>S</span>ocial
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
