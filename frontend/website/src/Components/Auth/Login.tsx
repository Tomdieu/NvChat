import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Form, Formik } from "formik";

const useStyles = makeStyles((theme) => ({
  leftContainer: {
    backgroundImage: `logo.svg`,
  },
}));

type Props = {};

const Login = (props: Props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      height={"100vh"}
      width={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item width={"500px"} component={Paper}>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(e) => {}}
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
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 3,
                padding: 3,
              }}
              component={Form}
            >
              <Typography sx={{ textAlign: "center", fontSize: "1.5em" }}>
                Login
              </Typography>
              <TextField
                label={"username"}
                required
                value={values.username}
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
              />
              <TextField
                label={"password"}
                required
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              <Button type="submit" variant="contained">
                Login
              </Button>
              <Typography textAlign={"center"} variant="caption">
                Don't have an account ? <a href="#">Register</a>
              </Typography>
              <Typography textAlign={"center"} variant="caption">
                Copyright &copy; 2021 -2023
              </Typography>
            </Box>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Login;
