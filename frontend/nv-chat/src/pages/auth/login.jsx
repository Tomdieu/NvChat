import ROUTES from "@constants/routes";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet";
import LogoIcon from "@assets/logo.svg";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
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

const Login = () => {
  const date = new Date();
  const classes = useStyles();
  return (
    <Grid
      container
      alignSelf={"center"}
      height={"100vh"}
      width={"100vw"}
      sx={{ backgroundColor: "#192B3E" }}
    >
      <Helmet>
        <title>Login | NvChat</title>
      </Helmet>
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
          <Box className={classes.center}>
            <img src={LogoIcon} alt="Chat Icon" className={classes.chatIcon} />
          </Box>
          <Typography textAlign={"center"} variant={"h3"}>
            Login
          </Typography>
          <Box>
            <TextField label={"username"} type={"text"} fullWidth />
          </Box>
          <Box>
            <TextField label={"password"} type={"password"} fullWidth />
          </Box>
          <Box className={classes.flex}>
            <Box sx={(theme) => ({ display: "flex", alignItems: "center" })}>
              <Checkbox />
              <Typography>Keep me signed in</Typography>
            </Box>
            <Typography textAlign={"center"} fontWeight={"600"}>
              <a href={ROUTES.FORGOT_PASSWORD} style={{ color: "#1E90FF" }}>
                Forgot Password ?
              </a>
            </Typography>
          </Box>
          <Box>
            <Button value={"Login"} variant="contained" size="large" fullWidth>
              Login
            </Button>
          </Box>
          <Typography textAlign="center">
            Not yet have an account ?{" "}
            <a href={ROUTES.REGISTER} style={{ color: "#1E90FF" }}>
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
