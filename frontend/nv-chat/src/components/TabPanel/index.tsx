import React from 'react'

import { Box } from "@mui/material";

type Props = {
  children:React.ReactNode,
  label:"chat" | "group" | "post" | "friends" | "settings" | "notifications",
  value:"chat" | "group" | "post" | "friends" | "settings" | "notifications",
  style?:React.CSSProperties,
}

const TabPanel = (props: Props) => {
  const { children, label, value,style, ...others } = props;
  return (
    <Box style={style} hidden={value !== label} {...others}>
      {children}
    </Box>
  );
}

export default TabPanel
