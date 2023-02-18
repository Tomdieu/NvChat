import { COLORS } from "@constants/index";
import { ChatOutlined, Group, GroupWork, MenuOutlined, Search } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  sidebar: {
    backgroundColor: "red",
    height: "100vh",
  },
}));

const index = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { collapseSidebar, rtl } = useProSidebar();
  const classes = useStyle();
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        bottom: 0,
        top: 0,
        height: "100vh",
        "& .pro-sidebar-linear": {
          background: COLORS.blue.shades.light,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        // "& .pro-inner-item": {
        //   padding: "5px 35px 5px 20px !important",
        // },
        // "& .pro-innner-item:hover": {
        //   color: "#8668fd !important",
        // },
        // "& .pro-menu-item.active": {
        //   color: "#6870fa !important",
        // },
      }}
    >
      <Sidebar className={classes.sidebar}>
        <Menu>
          <MenuItem
            icon={<MenuOutlined style={{ cursor: "pointer", color: "#fff" }} />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center", cursor: "pointer" }}
          >
            {" "}
            <Typography sx={{ color: "#fff" }} variant={"h4"}>
              Nv Chat
            </Typography>
          </MenuItem>
          <MenuItem
            icon={<ChatOutlined style={{ cursor: "pointer", color: "#fff" }} />}
          >
    <Typography>
    Chat

    </Typography>
          </MenuItem>
          <MenuItem icon={<Group style={{ cursor: "pointer", color: "#fff" }}/>}>
            <Typography>Group</Typography>
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default index;
