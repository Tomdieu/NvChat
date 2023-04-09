import Feed from "Components/Feed/Feed";
import Rightbar from "Components/Rightbar/Rightbar";
import Sidebar from "Components/Sidebar/Sidebar";
import Topbar from "Components/Topbar/Topbar";
import { Box, Grid } from "@mui/material";
import { useStyles } from "./styles";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

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
      <Grid container justifyContent={"space-between"}>
        <Grid item md={3}>
          <Sidebar />
        </Grid>
        {/* 7.5 */}
        <Grid item md={6} sm={9}>
          <Feed />
        </Grid>
        <Grid item md={3}>
          <Rightbar />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
