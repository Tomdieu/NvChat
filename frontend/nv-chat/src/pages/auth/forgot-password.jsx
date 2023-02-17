import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  Alert,
  Grid,
  Box,
  Paper,
  Fab,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Helmet } from "react-helmet";
import {
  ArrowBackOutlined,
  ArrowLeftRounded,
  RoundaboutLeftOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(4),
  },
  inputBox: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  actionButton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const steps = ["Enter your email", "Enter new password", "Confirm password"];

const ResetPasswordPage = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigate();
  const classes = useStyles();

  const handleNext = () => {
    if (activeStep === 0 && email.trim() === "") {
      setErrorMessage("Please enter your email.");
      return;
    }
    if (activeStep === 1 && password.trim() === "") {
      setErrorMessage("Please enter a new password.");
      return;
    }
    if (activeStep === 2 && confirmPassword !== password) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    setErrorMessage("");
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Grid
      container
      height={"100vh"}
      width={"100vw"}
      position={"relative"}
    >
      <Helmet>
        <title>Fogotten Password | NvChat</title>
      </Helmet>
      <Grid
        item
        md
        sm
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        component={Paper}
        sx={{ backgroundColor: "#24455E", overflow: "hidden" }}
      >
        <Paper className={classes.container}>
          <Typography
            textAlign={"center"}
            variant={"h4"}
            sx={(theme) => ({ marginBottom: theme.spacing(2) })}
          >
            Reset Password / NvChat
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box className={classes.inputBox}>
            {activeStep === 0 && (
              <Box>
                <Typography fontSize={"h2"}>Enter your email:</Typography>
                <TextField
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </Box>
            )}
            {activeStep === 1 && (
              <Box className={classes.inputBox}>
                <Typography fontSize={"h3"}>Enter new password:</Typography>
                <TextField
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
              </Box>
            )}
            {activeStep === 2 && (
              <Box className={classes.inputBox}>
                <Typography fontSize={"h3"}>Confirm password:</Typography>
                <TextField
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                />
              </Box>
            )}
            {errorMessage && (
              <Alert
                sx={(theme) => ({ marginTop: theme.spacing(1) })}
                severity="error"
              >
                {errorMessage}
              </Alert>
            )}
          </Box>
          <Box className={classes.actionButton}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Reset Password" : "Next"}
            </Button>
          </Box>
        </Paper>
        <Fab
          onClick={() => {
            navigation(-1);
          }}
          sx={(theme) => ({
            position: "absolute",
            zIndex: 99,
            right: 20,
            bottom: 20,
          })}
        >
          <ArrowBackOutlined />
        </Fab>
      </Grid>
    </Grid>
  );
};

export default ResetPasswordPage;
