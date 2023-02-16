"use client";
import {
  Grid,
  Box,
  Step,
  Stepper,
  StepLabel,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { makeStyles } from "@mui/styles";

export const runtime = "experimental-edge"; // 'nodejs' (default) | 'experimental-edge'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    width: "30%",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      width: "40%",
    },
  },
  btnContainer: {
    display: "flex",
    gap: theme.spacing(10),
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: theme.spacing(3),
  },
}));

const ForgotPasswordPage = () => {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");

  const handleClick = () => {
    if (username.length >= 5) {
      if (step >= 3) {
        return setStep(1);
      }
      return setStep(step + 1);
    }
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Grid container alignSelf={"center"} height={"100vh"} width={"100vw"}>
      <Grid
        item
        md={12}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box component={Paper} className={classes.container}>
          <Typography textAlign={"center"}>Reset Password</Typography>
          <Stepper activeStep={step}>
            <Step>
              <StepLabel>Fill</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirm Code</StepLabel>
            </Step>
            <Step>
              <StepLabel>Reset Password</StepLabel>
            </Step>
          </Stepper>
          <Box sx={(theme) => ({ marginTop: theme.spacing(1) })}>
            <Box className={classes.btnContainer}>
              {step === 1 && (
                <TextField
                  focused
                  label={"username"}
                  placeholder={"username or password"}
                  value={username}
                  onChange={handleChange}
                  fullWidth
                />
              )}
              {step === 2 && (
                <TextField
                  focused
                  label={"Code"}
                  placeholder={"Confirmation Code"}
                  value={username}
                  onChange={handleChange}
                  fullWidth
                />
              )}
              {step > 1 ? (
                <Button onClick={() => setStep(step - 1)}>Back</Button>
              ) : null}
              <Button
                disable={Boolean(username.length < 5)}
                variant="contained"
                onClick={handleClick}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPasswordPage;
