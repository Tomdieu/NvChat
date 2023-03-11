import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";
import { Call, MoreVert } from "@mui/icons-material";
import { GroupMember } from "types/GroupMember";

type Props = {
  name?: string;
  participants?: GroupMember[];
  typing?: string;
  icon: string;
};

const TopGroupBar = (props: Props) => {
  const classes = useStyles();
  const { name, participants, typing, icon } = props;
  const isTyping = Boolean(typing);
  return (
    <Box className={classes.topbar}>
      <Box className={classes.topbarWrapper}>
        <Avatar className={classes.topbarImg} src={icon} alt={name} />
        <Box className={classes.topbarCenter}>
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: "bold" }}>
            {name && name}
          </Typography>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{
              letterSpacing: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {participants?.map((participant, index) => (
              <>{participant.user.user.username}</>
            ))}
          </Typography>
        </Box>
        <Box className={classes.topbarIcons}>
          {/* <IconButton className={classes.topbarIcon}>
            <Call />
          </IconButton> */}
          <IconButton className={classes.topbarIcon}>
            <MoreVert />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default TopGroupBar;
