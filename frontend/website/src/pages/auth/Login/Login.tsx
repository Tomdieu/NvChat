import React from "react";
import { useStyles } from "./styles";
import { Grid } from "@mui/material";

import LoginComponent from "Components/auth/Login";

type Props = {};

const Login = (props: Props) => {
  const classes = useStyles();
  return <LoginComponent />;
};

export default Login;
