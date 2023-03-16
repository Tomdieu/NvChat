import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Form, Formik } from "formik";
import LOGO from "assets/logo.svg";
import PasswordInput from "Components/PasswordInput";
import { useAuth } from "Context/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const { login, setUserToken, setUserProfile } = useAuth();

  const date = new Date();

  const navigate = useNavigate();

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
          initialValues={{ username: "", password: "" }}
          onSubmit={(e: { username: string; password: string }) => {
            setLoading(true);

            login(e.username, e.password)
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  setUserToken(data.token);
                  setUserProfile(data.data);
                  setTimeout(() => {
                    navigate("/");
                  }, 1000);
                }
                console.log(data);
              })
              .catch((err) => console.log(err))
              .finally(() => setLoading(false));
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
              <Typography variant="h3" sx={{ textAlign: "center" }}>
                Login
              </Typography>
              <TextField
                label={"username"}
                required
                name="username"
                value={values.username}
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
                fullWidth
              />
              <PasswordInput
                label={"password"}
                required
                name="password"
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                fullWidth
              />

              <Button
                type="submit"
                size="large"
                variant="contained"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress
                    sx={{ color: "#fff", width: "24px", height: "24px" }}
                  />
                ) : (
                  "Login"
                )}
              </Button>
              <Typography textAlign={"center"}>
                Don't have an account ? <a href="#">Register</a>
              </Typography>
              <Typography textAlign={"center"}>
                Copyright &copy; 2021 - {date.getFullYear()}
              </Typography>
            </Box>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Login;
