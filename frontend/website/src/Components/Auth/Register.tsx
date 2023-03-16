import { AccountCircle, Home } from "@mui/icons-material";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PasswordInput from "Components/PasswordInput";
import { useAuth } from "Context/AuthContext";
import ApiService from "Utils/ApiService";
import LOGO from "assets/logo.svg";
import { Form, Formik } from "formik";
import { UserCreateSchema } from "schema/UserCreateProfile";
import { UserProfile } from "types/UserProfile";

type Props = {};

const Register = (props: Props) => {
  const { showBar, setUserToken, setUserProfile } = useAuth();
  return (
    <Grid
      container
      height={"100vh"}
      width={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ backgroundColor: "#218af2" }}
    >
      <Grid item width={"500px"} component={Paper}>
        <Formik
          validationSchema={UserCreateSchema}
          initialValues={{
            confirmPassword: "",
            username: "",
            phoneNumber: "",
            password: "",
          }}
          onSubmit={(e: { username: any; password: any; phoneNumber: any }) => {
            console.log(e);
            const newUSer: UserProfile = {
              user: {
                username: e.username,
                password: e.password,
              },
              phone_number: e.phoneNumber,
            };

            ApiService.register(newUSer)
              .then((res) => res.json())
              .then((data) => {
                if (data.data) {
                  showBar(
                    `Account Created Successfully For ${data.data.user.username}!`,
                    <AccountCircle />,
                    "success"
                  );
                  setUserToken(data.token);
                  setUserProfile(data.data);
                }
              })
              .catch((err) => console.log(err));
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
              autoComplete=""
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
                name="username"
                value={values.username}
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
                error={Boolean(touched.username && errors.username)}
                helperText={
                  Boolean(touched.username) &&
                  Boolean(errors.username) &&
                  errors.username.toString()
                }
              />
              <TextField
                label={"Phone Number"}
                required
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                helperText={
                  touched.phoneNumber &&
                  errors.phoneNumber &&
                  errors.phoneNumber.toString()
                }
              />
              <PasswordInput
                label={"password"}
                required
                name="password"
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                aria-autocomplete="none"
                error={Boolean(touched.password && errors.password)}
                helperText={
                  touched.password &&
                  errors.password &&
                  errors.password.toString()
                }
              />
              <PasswordInput
                label={"Confirm Password"}
                required
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                error={Boolean(
                  touched.confirmPassword && errors.confirmPassword
                )}
                helperText={
                  touched.confirmPassword &&
                  errors.confirmPassword &&
                  errors.confirmPassword.toString()
                }
              />
              <Button
                disabled={Boolean(!isValid || !dirty)}
                type="submit"
                variant="contained"
                size="large"
              >
                Register
              </Button>
              <Typography textAlign={"center"}>
                Already have an account ? <a href="#">Login</a>
              </Typography>
              <Typography textAlign={"center"}>
                Copyright &copy; 2021 - {new Date().getFullYear()}
              </Typography>
            </Box>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Register;
