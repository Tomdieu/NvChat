import React, { useEffect } from "react";
import { useStyles } from "./styles";
import { Grid } from "@mui/material";

import LoginComponent from "Components/auth/Login";
import { useNavigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      return navigate("/");
    }
  }, []);

  return <LoginComponent />;
};

export default Login;
