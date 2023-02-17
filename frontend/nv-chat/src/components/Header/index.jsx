import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          NvChat
        </Typography>
        <IconButton color="inherit">
          <Avatar />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
