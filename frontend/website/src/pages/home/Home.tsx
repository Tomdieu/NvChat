import Feed from "Components/Feed/Feed";
import Rightbar from "Components/Rightbar/Rightbar";
import Sidebar from "Components/Sidebar/Sidebar";
import Topbar from "Components/Topbar/Topbar";
import { Box, Grid } from "@mui/material";
import { useStyles } from "./styles";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "Context/AuthContext";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const { userToken } = useAuth();
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/auth/login");
    }
  }, []);
  return (
    <>
      <Topbar />
      {/* <Box className={classes.homeContainer}>
        <Sidebar />
        <Feed />
        <Rightbar />
      </Box> */}
      <Grid container>
        <Grid item md={3}>
          <Sidebar />
        </Grid>
        <Grid item md={5.5} sm={9}>
          <Feed />
        </Grid>
        <Grid item md={3.5}>
          <Rightbar />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
