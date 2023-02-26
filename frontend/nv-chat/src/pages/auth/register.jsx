import { Coronavirus } from "@mui/icons-material";
import {
  Box,
  Grid,
  TextField,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";

import { registerSchema } from "@schema";
import ROUTES from "@constants/routes";
import { Helmet } from "react-helmet";

import LogoIcon from '@assets/logo.svg'
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  chatIcon: {
    width: 50,
    height: 50,
    marginBottom: theme.spacing(4),
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Register = ({ navigation }) => {
  const date = new Date();
  const [open, setOpen] = React.useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const classes = useStyles()
  return (
    <Grid container alignSelf={"center"} height={"100vh"} width={"100vw"} sx={{backgroundColor:'#192B3E',overflowY:'auto'}}>
        <Helmet>
            <title>Register | NvChat</title>
        </Helmet>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          severity="error"
          // sx={{ width: "100%" }}
          icon={<Coronavirus />}
          sx={(theme) => ({
            padding: theme.spacing(2),
            fontSize: 25,
            alignItems: "center",
            justifyContent: "space-between",
          })}
          onClose={handleClose}
        >
          Registration Successfull
        </Alert>
      </Snackbar>
      <Grid
        item
        md={12}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            margin: 10,
            padding: 3,
            width: "500px",
          }}
          component={Paper}
        >
          <Formik
            initialValues={{
              username: "",
              email: "",
              country: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => {
              // console.log(values);
            }}
            validationSchema={registerSchema}
          >
            {({
              handleSubmit,
              isValid,
              handleBlur,
              handleChange,
              values,
              errors,
              touched,
              dirty,
            }) => (
              <Box
                sx={(theme) => ({
                  display: "flex",
                  flexDirection: "column",
                  gap: theme.spacing(1),
                })}
              >
              <Box className={classes.center}>
              <img src={LogoIcon} alt="Chat Icon" className={classes.chatIcon} />
              </Box>
                <Typography variant={"h4"} textAlign={"center"}>
                  Create an account
                </Typography>
                <Box>
                  <TextField
                    name="username"
                    label="username"
                    value={values.username}
                    onChange={handleChange("username")}
                    onBlur={handleBlur("username")}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                    fullWidth
                  />
                </Box>

                <Box>
                  <TextField
                    name="email"
                    label="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                  />
                </Box>
                <Box>
                  <TextField
                    label="country"
                    name="country"
                    value={values.country}
                    onChange={handleChange("country")}
                    onBlur={handleBlur("country")}
                    error={touched.country && Boolean(errors.country)}
                    helperText={touched.country && errors.country}
                    fullWidth
                  />
                </Box>

                <Box>
                  <TextField
                    label="phoneNumber"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNumber")}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    fullWidth
                  />
                </Box>

                <Box>
                  <TextField
                    label="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                  />
                </Box>
                <Box>
                  <TextField
                    label="confirmPassword"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    fullWidth
                  />
                </Box>
                <Button variant={"contained"} size={"large"}>
                  Sign up
                </Button>
                <Typography textAlign="center">
                  Already a member ?{" "}
                  <a href={ROUTES.LOGIN} style={{ color: "#1E90FF" }}>
                    Login
                  </a>
                </Typography>
                <Typography
                  textAlign="center"
                  sx={(theme) => ({ marginTop: theme.spacing(1) })}
                >
                  Copyright <span>&copy;</span> 2022 - {date.getFullYear()}
                </Typography>
              </Box>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
