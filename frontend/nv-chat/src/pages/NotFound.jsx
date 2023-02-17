import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { COLORS } from "@constants/index";

import LogoIcon from "@assets/logo.svg";
import { ArrowLeft, TheaterComedySharp } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    textAlign: "center",
    backgroundColor: "#192B3E",
  },
  heading: {
    fontSize: "5rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(4),
    color: "#f3ecec",
  },
  button: {
    marginTop: theme.spacing(4),
    color: theme.palette.text.secondary,
    margin: theme.spacing(2),
  },
  chatIcon: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing(4),
    cursor: "pointer",
  },
  center:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    gap:theme.spacing(1)
  }
}));

const NotFound = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box className={classes.root}>
      
      <Box
        sx={(theme) => ({
          padding: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
          margin: theme.spacing(3),
        })}
      >
        <Typography className={classes.heading} variant="h1">
          404
        </Typography>
        <Typography variant="h3" color={COLORS.white.hex}>
          Oops! Page Not Not Found.
        </Typography>
      </Box>
      <Button
        className={classes.button}
        variant="contained"
        onClick={handleGoHome}
        size={"large"}
        startIcon={<ArrowLeft/>}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
