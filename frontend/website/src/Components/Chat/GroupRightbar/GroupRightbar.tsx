import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useGroup } from "Context/GroupContext";
import { useStyles } from "./styles";
import {
  CameraAltOutlined,
  Close,
  GroupAddOutlined,
  LogoutRounded,
  SearchRounded,
} from "@mui/icons-material";

import "./style.css";

import { BsDot } from "react-icons/bs";
import { useAuth } from "Context/AuthContext";
import GroupDescription from "./GroupDescription";
import GroupHead from "./GroupHead";

type Props = {};

const GroupRightbar = (props: Props) => {
  const { isRightOpen, selectedGroup, setIsRightOpen } = useGroup();
  const classes = useStyles();
  const { userProfile } = useAuth();

  return (
    <Grid
      item
      md={3}
      sm={0}
      sx={{ display: isRightOpen ? "none" : "block" }}
      className={classes.rightbar}
    >
      <Box className={classes.rightbarWrapper}>
        <Box className={classes.rightbarTop}>
          <IconButton
            className={classes.closeBtn}
            onClick={() => setIsRightOpen(false)}
          >
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
          <Box
            sx={{ borderRadius: 0 }}
            component={Paper}
            className={classes.groupMemberContainer}
            elevation={0}
          >
            <Box className={classes.groupMemberTopContainer}>
              <Typography color="grey">
                {selectedGroup?.group_members.length} member
              </Typography>
              <IconButton>
                <SearchRounded />
              </IconButton>
            </Box>
            <Box>
              {selectedGroup?.group_members?.map((member, index) => (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap={2}
                  justifyContent={"space-between"}
                  sx={(theme) => ({
                    p: 0.5,
                    borderRadius: 1,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#efecec",
                    },
                    "& ::selection": {
                      backgroundColor: "transparent",
                    },
                  })}
                >
                  <Avatar
                    src={member.user.profile_picture}
                    alt={member.user.user.username}
                  />
                  <Box flex={1}>
                    <Typography>
                      {member.user.user.username === userProfile.user.username
                        ? "you"
                        : member.user.user.username}
                    </Typography>
                    <span style={{ color: "#ada4a4", fontSize: ".8em" }}>
                      {member.user.bio || "hello i am using NvChat"}
                    </span>
                  </Box>
                  <Box>
                    {member.is_manager && (
                      <Badge
                        sx={(theme) => ({
                          backgroundColor: "#c9e0fd",
                          color: "#3886e5fa",
                          borderRadius: 2,
                          p: 0.5,
                          fontSize: ".8em",
                        })}
                      >
                        Admin
                        {/* <span>Admin</span> */}
                      </Badge>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
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
