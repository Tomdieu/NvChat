import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useGroup } from "Context/GroupContext";
import { useStyles } from "./styles";
import {
  Close,
  GroupAddOutlined,
  LogoutRounded,
  SearchRounded,
} from "@mui/icons-material";

import "./style.css";

import { useAuth } from "Context/AuthContext";
import GroupDescription from "./GroupDescription";
import GroupHead from "./GroupHead";
import GroupMemberList from "./GroupMemberList";

type Props = {};

const GroupRightbar = (props: Props) => {
  const { isRightOpen, selectedGroup, setIsRightOpen, toggle } = useGroup();
  const classes = useStyles();
  const { userProfile } = useAuth();

  return (
    <Grid
      item
      md={3}
      sm={0}
      sx={{ display: isRightOpen ? "block" : "none" }}
      className={classes.rightbar}
    >
      <Box className={classes.rightbarWrapper}>
        <Box className={classes.rightbarTop}>
          <IconButton className={classes.closeBtn} onClick={toggle}>
            <Close sx={{ fontWeight: "bold" }} />
          </IconButton>
          <span className={classes.title}>Group Info</span>
        </Box>
        <Box className={classes.rightbarBottom}>
          <GroupHead />
          <GroupDescription />
          <Box
            className={classes.groupMemberContainer}
            component={Paper}
            sx={{
              "&:hover": {
                backgroundColor: "#c3dbf9",
              },
            }}
          >
            <Box
              display="flex"
              gap={2}
              sx={{
                cursor: "pointer",
                "& ::selection": {
                  backgroundColor: "transparent",
                },
                "& > *": {
                  color: "#5199f0",
                },
              }}
            >
              <GroupAddOutlined />
              <Typography>Add Members</Typography>
            </Box>
          </Box>
          <GroupMemberList />
          <Box component={Paper} className={classes.groupInfoDangerContain}>
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={2}
              // justifyContent={"space-between"}
              sx={(theme) => ({
                lineHeight: "40px",
                height: "42px",
                "& > *": {
                  color: "#f33939",
                },
                p: 0.5,
                borderRadius: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#e5c3c3",
                },
                "& ::selection": {
                  backgroundColor: "transparent",
                },
              })}
            >
              <LogoutRounded />
              <Typography>Quit Group</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default GroupRightbar;
