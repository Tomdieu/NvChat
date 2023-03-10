import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";
import { Call, MoreVert } from "@mui/icons-material";

type Props = {};

const TopGroupBar = (props: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.topbar}>
      <Box className={classes.topbarWrapper}>
        <Avatar className={classes.topbarImg} />
        <Box className={classes.topbarCenter}>
          <Typography variant="h5">INFO L3</Typography>
          <Typography variant="subtitle2">You,xyx and 99 others</Typography>
        </Box>
        <Box className={classes.topbarIcons}>
          <IconButton className={classes.topbarIcon}>
            <Call />
          </IconButton>
          <IconButton className={classes.topbarIcon}>
            <MoreVert />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default TopGroupBar;
