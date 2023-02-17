import { COLORS } from "@constants/index";
import { MenuOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem,useProSidebar  } from "react-pro-sidebar";

const index = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { collapseSidebar, rtl } = useProSidebar();
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
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-innner-item:hover": {
          color: "#8668fd !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      
      <Sidebar style={{ height: "100vh",backgroundColor:'navy' }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlined style={{cursor:'pointer'}}/>}
            onClick={() => {
              collapseSidebar();
            }}
        
            style={{ textAlign: "center",cursor:'pointer' }}
          >
            {" "}
            <h2>Admin</h2>
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default index;
