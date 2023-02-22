import { COLORS } from "@constants/index";
import {
  ChatOutlined,
  Group,
  GroupWork,
  MenuOutlined,
  Search,
} from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";

import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  sidebar: {
    // backgroundColor: "#000",

    borderColor: "transparent",
    height: "100vh",
    "& > .css-dip3t8": {
      backgroundColor: "#2568",
    },
  },
  icon: {
    width: 25,
    height: 25,
  },
  center: {
    display: "flex",
    alignSelf: "center",
    width: "100%",
  },
}));

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem icon={icon} onClick={setSelected()}>
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SideBar = (props) => {
  const { style } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { collapseSidebar, rtl, collapsed } = useProSidebar();
  const classes = useStyle();
  return (
    <Box
      sx={[
        {
          // position: "sticky",
          // left: 0,
          // bottom: 0,
          // // top: 0,
          height: "100vh",
          "& .pro-sidebar-linear": {
            background: COLORS.blue.shades.light,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
        },
        style,
      ]}
    >
      <Sidebar className={classes.sidebar}>
        <Menu>
          {collapsed ? (
            <MenuItem
              icon={<img className={classes.icon} src="/logo.svg" alt="logo" />}
            ></MenuItem>
          ) : (
            <Box mb="25px" mt={5}>
              <Box
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img
                  src="/logo.svg"
                  alt="logo"
                  width="75px"
                  height={"75px"}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Box>
          )}
          <MenuItem
            icon={<MenuOutlined style={{ cursor: "pointer", color: "#fff" }} />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ cursor: "pointer" }}
          >
            {" "}
            <Typography sx={{ color: "#fff", fontWeight: "600" }}>
              Nv Chat
            </Typography>
          </MenuItem>
          <MenuItem
            icon={<ChatOutlined style={{ cursor: "pointer", color: "#fff" }} />}
          >
            <Typography color={"#fff"}>Discussion</Typography>
          </MenuItem>
          <MenuItem
            icon={<Group style={{ cursor: "pointer", color: "#fff" }} />}
          >
            <Typography color={"#fff"}>Group</Typography>
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
