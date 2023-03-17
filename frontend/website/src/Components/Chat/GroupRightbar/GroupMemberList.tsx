import { SearchRounded } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useGroup } from "Context/GroupContext";
import React from "react";
import { useStyles } from "./styles";
import { useAuth } from "Context/AuthContext";

type Props = {};

const GroupMemberList = (props: Props) => {
  const classes = useStyles();
  const { selectedGroup } = useGroup();
  const { userProfile } = useAuth();
  return (
    <Box
      sx={{ borderRadius: 0 }}
      component={Paper}
      className={classes.groupMemberContainer}
      elevation={0}
    >
      <Box className={classes.groupMemberTopContainer}>
        <Typography color="grey">
          {selectedGroup?.group_members?.length} member
        </Typography>
        <IconButton>
          <SearchRounded />
        </IconButton>
      </Box>
      <Box>
        {selectedGroup?.group_members?.map((member, index) => (
          <Box
            key={index}
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
                </Badge>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GroupMemberList;
