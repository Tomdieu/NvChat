import React from "react";

import SideBar from "@components/SideBar";
import { Box } from "@mui/material";

const index = (props) => {
  const { children } = props;
  return (
    <Box sx={{ display: "flex", flexDirection: "row",overflow:'none', overflowY: "auto" }}>
      <SideBar style={{height:'100vh'}}/>
      <Box
        sx={{
          "& >*": {
            width: "100%",
            height: "100%",
            overflow:"none",
            overflowY: "auto"
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default index;
