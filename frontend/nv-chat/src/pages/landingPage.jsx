import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChatIcon from "../assets/chat-icon-512.png";
import HoldingPhoneIcon from "../assets/holding-phone.jpg";
import LogoIcon from "@assets/logo.svg";
import { Helmet } from "react-helmet";
import ROUTES from "@constants/routes";

const colorPalettes = {
  autumnLeaves: ["#8B3A3A", "#B85450", "#D2734F", "#EBB261", "#F4E7D6"],
  mysticalForest: ["#1B1D1E", "#353535", "#666666", "#9F9F9F", "#D4D4D4"],
  oceanBlues: ["#192B3E", "#24455E", "#3A688E", "#5B8CB8", "#A3C3D9"],
  vintageRoses: ["#6D2E46", "#A8475B", "#D8837F", "#E6B49C", "#F2D2B2"],
  goldenHour: ["#FCA311", "#FFD3B5", "#D4AF37", "#7D6608", "#383522"],
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  title: {
    marginBottom: theme.spacing(4),
    textAlign: "center",
    color: "#F4E7D6",
  },
  button: {
    margin: theme.spacing(2),
    "&:hover": {
      color: "white",
    },
  },
  chatIcon: {
    width: 200,
    height: 200,
    marginBottom: theme.spacing(4),
  },
  description: {
    marginBottom: theme.spacing(4),
    textAlign: "center",
    color: "#ccc",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(5),
    margin: theme.spacing(6),
  },
  holdingIcon: {
    width: "99%",
    height: "100vh",
    marginBottom: theme.spacing(4),
  },
  leftContainer: {
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%",
    //   height: "100%",
    // },
  },
  rightContainer: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "100%", 
      display: "none",
    },
  },
}));

function LandingPage() {
  const classes = useStyles();
  //   md={6} sm={12}
  return (
    <Grid
      container
      height={"100vh"}
      width={"100vw"}
      sx={{ backgroundColor: "#192B3E", overflow: "hidden", overflowY: "auto" }}
    >
      <Helmet>
        <title>NvChat</title>
      </Helmet>

      <Grid
        item
        md={6}
        sm={12}
        alignSelf={"center"}
        className={classes.leftContainer}
      >
        <Box className={classes.center}>
          {/* <img src={ChatIcon} alt="Chat Icon" className={classes.chatIcon} /> */}
          <img src={LogoIcon} alt="Chat Icon" className={classes.chatIcon} />
        </Box>
        <Typography variant="h2" className={classes.title}>
          NvChat
        </Typography>
        <Typography variant="h5" className={classes.description}>
          Connect with people and have meaningful conversations on NvChat.
        </Typography>
        <Box className={classes.flex}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            size="large"
            href={ROUTES.LOGIN}
          >
            Login
          </Button>
          <Button
            size="large"
            variant="contained"
            color="warning"
            className={classes.button}
            href={ROUTES.REGISTER}
          >
            Register
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        md={6}
        sm={12}
        alignSelf={"center"}
        sx={{ backgroundColor: "#fff" }}
        className={classes.rightContainer}
      >
        <Box className={classes.center}>
          <img
            src={HoldingPhoneIcon}
            alt="Chat Icon"
            className={classes.holdingIcon}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
