import React from "react";

import { Box, Grid } from "@mui/material";


const Layout = (props) => {
  const { children } = props;
  return (

    <Grid container>

      <Grid item md={3}>LeftBar</Grid>
      <Grid item md={6}>Center</Grid>
      <Grid item md={3}>Right</Grid>

    </Grid>
  );
};

export default Layout;
