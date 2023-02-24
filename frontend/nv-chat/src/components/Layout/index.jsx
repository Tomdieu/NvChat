import React from "react";

import { Box, Grid } from "@mui/material";


const index = (props) => {
  const { children } = props;
  return (

    <Grid container width={'100vw'} height={'100vh'}>

      <Grid item md={3}>LeftBar</Grid>
      <Grid item md={6}>Center</Grid>
      <Grid item md={3}>Right</Grid>

    </Grid>
  );
};

export default index;
