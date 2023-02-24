import { Box } from "@mui/material";
import React from "react";

const TabPanel = (props) => {
  const { children, index, value, ...others } = props;
  return (
    <Box hidden={value !== index} {...others}>
      {children}
    </Box>
  );
};

export default TabPanel;
