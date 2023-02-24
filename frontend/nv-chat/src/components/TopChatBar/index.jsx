import { AccountCircle, Group, MoreVert } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./style";

const TopChatBar = (props) => {
  const {
    name,
    participants = [],
    icon,
    type = "group",
    msgIndicator = null,
  } = props;
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box>
        {icon !== null ? (
          <Avatar alt={name} src={icon} />
        ) : (
          <Avatar>
            {type === "group" ? <AccountCircle /> : <AccountCircle />}
          </Avatar>
        )}
      </Box>
      <Box className={classes.center}>
        <Typography className={classes.title}>{name}</Typography>
        {msgIndicator !==null ? (
          <Typography className={classes.msg} variant="caption">{msgIndicator}</Typography>
        ) : (
          <Typography>
            {participants?.map((user, index) => (
              <Typography
                noWrap
                sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {user.user.username}
              </Typography>
            ))}
          </Typography>
        )}
      </Box>
      <IconButton>
        <MoreVert />
      </IconButton>
    </Box>
  );
};

export default TopChatBar;
