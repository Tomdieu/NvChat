import { ArrowDropDown, Close, SearchRounded } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useGroup } from "context/GroupContext";
import React, { useState, useEffect } from "react";
import { useStyles } from "./styles";
import { useAuth } from "context/AuthContext";
import { GroupMember } from "types/GroupMember";
import ApiService from "utils/ApiService";
import { GroupSerializer } from "types/GroupSerializer";

type Props = {};

const GroupMemberList = (props: Props) => {
  const classes = useStyles();
  const { selectedGroup, setGroups, groups, setSelectedGroup } = useGroup();
  const { userProfile } = useAuth();
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [selectedMember, setSelectedMember] = useState<GroupMember>(null);

  const { userToken } = useAuth();

  const isOpen = Boolean(anchorEl);

  const getUsername = () => {
    return userProfile.user.username;
  };
  const isCreator = (member: GroupMember) => {
    return userProfile.user.username === member.user.user.username;
  };

  useEffect(() => {
    setMembers(selectedGroup?.group_members);
  }, [selectedGroup]);

  useEffect(() => {
    if (name) {
      setMembers(
        selectedGroup?.group_members.filter((m) =>
          m.user.user.username.includes(name)
        )
      );
    } else {
      setMembers(selectedGroup?.group_members);
    }
  }, [name]);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    member: GroupMember
  ) => {
    setAnchorEl(e.currentTarget);
    setSelectedMember(member);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const reloadGroupData = () => {
    ApiService.getGroups(userToken)
      .then((res) => res.json())
      .then((data) => {
        setGroups(data.data);
        const groupData: GroupSerializer[] = data.data;

        const filterGroup = groupData.find((dt) => dt.id === selectedGroup.id);
        setSelectedGroup(filterGroup);
      })
      .catch((err) => console.log(err));
  };

  const makeAdmin = () => {
    if (selectedMember) {
      ApiService.updateGroupMember(
        { is_manager: true },
        selectedMember?.id,
        userToken
      )
        .then((res) => res.json())
        .then((data: GroupMember) => {
          reloadGroupData();
          setSelectedMember(null);

          console.log(data);
        })
        .catch((err) => console.log(err))
        .finally(() => handleClose());
    }
  };

  const handleMakeAdmin = () => {
    makeAdmin();
    handleClose();
  };

  const handleRemoveAdmin = () => {
    if (selectedMember) {
      ApiService.updateGroupMember(
        { is_manager: false },
        selectedMember?.id,
        userToken
      )
        .then((res) => res.json())
        .then((data: GroupMember) => {
          reloadGroupData();
          setSelectedMember(null);

          console.log(data);
        })
        .catch((err) => console.log(err))
        .finally(() => handleClose());
    }
  };

  const handleRemoveMember = () => {
    ApiService.removeGroup(
      { group: selectedGroup.id, user: selectedMember.user.id },
      userToken
    )
      .then((res) => res.json())
      .then((data) => {
        reloadGroupData();
        setSelectedMember(null);

        console.log(data);
      })
      .catch((err) => console.log(err))
      .finally(() => handleClose());
  };

  const handleReAdd = () => {
    if (selectedMember) {
      ApiService.updateGroupMember(
        { is_active: true },
        selectedMember?.id,
        userToken
      )
        .then((res) => res.json())
        .then((data: GroupMember) => {
          reloadGroupData();
          console.log(data);
          setSelectedMember(null);
        })
        .catch((err) => console.log(err))
        .finally(() => handleClose());
    }
  };
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
        {open ? (
          <Box
            display={"flex"}
            flex={1}
            sx={{ ml: 2, bgcolor: "#f3ececc9", borderRadius: 2 }}
          >
            <InputBase
              sx={{
                pl: 1,
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        ) : (
          <IconButton onClick={() => setOpen(true)}>
            <SearchRounded />
          </IconButton>
        )}
      </Box>
      <Box>
        {members?.map((member, index) => (
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
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent={"end"}
              alignItems={"flex-end"}
            >
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
              {!member.is_active && (
                <Badge
                  sx={(theme) => ({
                    backgroundColor: "#f1d5d5",
                    color: "red",
                    borderRadius: 2,
                    p: 0.5,
                    fontSize: ".8em",
                  })}
                >
                  Removed
                </Badge>
              )}
              {!isCreator(member) && (
                <IconButton
                  id="member-menu"
                  aria-controls={isOpen ? "message-menu" : undefined}
                  aria-haspopup={"true"}
                  aria-expanded={isOpen ? "true" : undefined}
                  onClick={(e) => {
                    handleClick(e, member);
                  }}
                >
                  <ArrowDropDown />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}
      </Box>
      <Menu
        id="message-menu"
        anchorEl={anchorEl}
        open={isOpen}
        MenuListProps={{ "aria-labelledby": "member-menu" }}
        onClose={handleClose}
      >
        {selectedMember &&
          selectedMember.is_active &&
          !selectedMember.is_manager && (
            <MenuItem onClick={() => handleMakeAdmin()}>
              <Box
                display="flex"
                // justifyContent={"flex-end"}
                alignItems={"center"}
                gap={5}
                sx={{
                  "& > *": {
                    color: "#4eae29",
                  },
                }}
              >
                <Typography>Set Admin</Typography>
              </Box>
            </MenuItem>
          )}
        {selectedMember &&
          selectedMember.is_active &&
          selectedMember.is_manager && (
            <MenuItem onClick={() => handleRemoveAdmin()}>
              <Box
                display="flex"
                // justifyContent={"flex-end"}
                alignItems={"center"}
                gap={5}
                sx={{
                  "& > *": {
                    color: "#4eae29",
                  },
                }}
              >
                <Typography>Remove Admin Title</Typography>
              </Box>
            </MenuItem>
          )}

        {selectedMember &&
          selectedMember.is_active &&
          selectedMember.user.user.username !== getUsername() && (
            <MenuItem onClick={() => handleRemoveMember()}>
              <Box
                display="flex"
                // justifyContent={"flex-end"}
                alignItems={"center"}
                gap={5}
                sx={{
                  "& > *": {
                    color: "#f26e6e",
                  },
                }}
              >
                <Typography>Remove Group</Typography>
              </Box>
            </MenuItem>
          )}
        {selectedMember && !selectedMember.is_active && (
          <MenuItem onClick={() => handleReAdd()}>
            <Box
              display="flex"
              // justifyContent={"flex-end"}
              alignItems={"center"}
              gap={5}
              sx={{
                "& > *": {
                  color: "green",
                },
              }}
            >
              <Typography>Re add</Typography>
            </Box>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default GroupMemberList;
