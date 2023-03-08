import Feed from "Components/Feed/Feed";
import Rightbar from "Components/Rightbar/Rightbar";
import Sidebar from "Components/Sidebar/Sidebar";
import Topbar from "Components/Topbar/Topbar";
import { Box, Grid } from "@mui/material";
import { useStyles } from "./styles";

type Props = {};

const Home = (props: Props) => {
  const classes = useStyles();
  return (
    <>
      <Topbar />
      <Box className={classes.homeContainer}>
        <Sidebar />
        <Feed />
        <Rightbar />
      </Box>
      {/* <Grid container>
        <Grid md={3}>
          <Sidebar />
        </Grid>
        <Grid md={5.5}>
          <Feed />
        </Grid>
        <Grid md={3.5}>
          <Rightbar />
        </Grid>
      </Grid> */}
    </>
  );
};

export default Home;
