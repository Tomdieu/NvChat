"use client";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
const Login = () => {
  const date = new Date();
  return (
    <Grid container alignSelf={"center"} height={"100vh"} width={"100vw"}>
    <Head>
      <title>Login</title>
    </Head>
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
          <Typography textAlign={"center"} variant={"h3"}>
            Login
          </Typography>
          <Box>
            <TextField label={"username"} type={"text"} fullWidth />
          </Box>
          <Box>
            <TextField label={"password"} type={"password"} fullWidth />
          </Box>
          <Box>
            <Button value={"Login"} variant="contained" size="large" fullWidth>
              Login
            </Button>
          </Box>

            <Typography textAlign="center">
              Not Yet Have An Account ?{" "}
              <a
                href="/register"
                style={{ color: "#1E90FF" }}
              >
                Register
              </a>
            </Typography>
            <Typography
              textAlign="center"
              sx={(theme) => ({ marginTop: theme.spacing(1) })}
            >
              Copyright <span>&copy;</span> 2022 - {date.getFullYear()}
            </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
