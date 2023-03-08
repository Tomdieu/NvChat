import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LOGO from "assets/logo.svg";
import { Form, Formik } from "formik";

const useStyles = makeStyles((theme) => ({
  leftContainer: {
    backgroundImage: `logo.svg`,
  },
}));

type Props = {};

const Register = (props: Props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      height={"100vh"}
      width={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{}}
    >
      <Grid item width={"500px"} component={Paper}>
        <Formik
          initialValues={{
            username: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(e) => {
            console.log(e);
          }}
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={LOGO} style={{ width: 64, height: 64 }} />
              </Box>
              <Typography sx={{ textAlign: "center", fontSize: "1.5em" }}>
                Register
              </Typography>
              <TextField
                label={"username"}
                required
                value={values.username}
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
              />
              <TextField
                label={"Phone Number"}
                required
                value={values.phoneNumber}
                onChange={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
              />
              <TextField
                label={"password"}
                required
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              <TextField
                label={"Confirm Password"}
                required
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
              />
              <Button type="submit" variant="contained">
                Register
              </Button>
              <Typography textAlign={"center"} variant="caption">
                Already have an account ? <a href="#">Login</a>
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

export default Register;
