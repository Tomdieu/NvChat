import { Chat, Notifications, Person, Search } from "@mui/icons-material";
import { Box, InputBase, Typography } from "@mui/material";
import React from "react";
import './index.css'

import { useStyles } from "./styles";

function Index() {
  const classes = useStyles()
  return (
    <Box className={classes.topbarContainer}>
      <div className={classes.topbarLeft}>
        <span variant="h3" className={classes.logo}>Nv Chat</span>
      </div>
      <div className={classes.topbarCenter}>
        <div className={classes.searchbar}>
          <Search />
          
          <InputBase fullWidth placeholder="Search for friend,post or video" className={classes.searchInput}/>
        </div>
      </div>
      <div className={classes.topbarRight}>
        <div className={classes.topbarLinks}>
          <div className="topbarLink">Home page</div>
          <div className="topbarLink">Timeline</div>
        </div>
      </div>
      <div className={classes.topbarIcons}>
        <div className="topbarIconItem">
          <Person />
          <span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
          <Chat />
          <span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
          <Notifications />
          <span className="topbarIconBadge">1</span>
        </div>
        <img alt="" src="/logo.svg" className="topbarImage"/>
      </div>
    </Box>
  );
}

export default Index;
