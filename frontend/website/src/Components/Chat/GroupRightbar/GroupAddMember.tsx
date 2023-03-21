import React, { useState, useEffect } from "react";
import { useStyles } from "./styles";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { Close, GroupAddOutlined, Save, GroupAdd } from "@mui/icons-material";
import { useAuth } from "context/AuthContext";
import ApiService from "utils/ApiService";
import { UserProfile } from "types/UserProfile";
import { useGroup } from "context/GroupContext";
import { GroupSerializer } from "types/GroupSerializer";

type Props = {};

const GroupAddMember = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const [friends, setFriends] = useState<UserProfile[]>([]);

  const [selectedFriends, setSelectedFriends] = useState<UserProfile[]>([]);

  const { userToken, userProfile, showBar } = useAuth();

  const [loading, setLoading] = useState(false);

  const { selectedGroup, setSelectedGroup, groups, setGroups } = useGroup();

  const isGroupMember = (profile: UserProfile) => {
    const groupMembers = selectedGroup.group_members.map(
      (member) => member.user
    );
    const member = groupMembers.find((member) => member.id === profile.id);
    if (member) {
      return true;
    }
    return false;
  };

  const selected = (profile: UserProfile) => {
    const search = selectedFriends.find((friend) => friend.id === profile.id);

    if (search) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (name) {
      ApiService.searchUser(name, userToken, true)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const searchResult = data?.filter(
            (d) => d.user.username !== userProfile.user.username
          );

          setFriends(searchResult);
        })
        .catch((err) => console.log(err));
    } else {
      setFriends([]);
    }
  }, [name]);

  const handleClick = (friend: UserProfile) => {
    setSelectedFriends([...selectedFriends, friend]);
  };

  const removeSelectedFriend = (friendToRemove: UserProfile) => {
    const otherFriends = selectedFriends.filter(
      (friend) => friend.id !== friendToRemove.id
    );

    setSelectedFriends(otherFriends);
  };

  const handleAddMembers = () => {
    if (selectedFriends) {
      setName("");
      selectedFriends.map((friend) => {
        setLoading(true);
        ApiService.addGroupMember(
          { user: friend.id, group: selectedGroup.id },
          userToken
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            showBar(data.message, <GroupAdd />, "success");
            removeSelectedFriend(friend);
            setLoading(false);

            ApiService.getGroups(userToken)
              .then((res) => res.json())
              .then((data) => {
                setGroups(data.data);
                const groupData: GroupSerializer[] = data.data;

                const filterGroup = groupData.find(
                  (dt) => dt.id === selectedGroup.id
                );
                setSelectedGroup(filterGroup);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      });
      setOpen(false);
    }
  };

  return (
    <Box
      component={Paper}
      sx={(theme) => ({
        padding: 0,
        marginTop: 0,
        borderRadius: 0,
      })}
    >
      <Button
        fullWidth
        variant="contained"
        startIcon={<GroupAddOutlined />}
        sx={{ textAlign: "right" }}
        onClick={() => setOpen(true)}
      >
        <Typography textAlign={"left"}>Add Members</Typography>
      </Button>

      <Dialog open={open}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"500px"}
          sx={{ p: 2 }}
        >
          <Typography variant="h5">
            Add group members in{" "}
            <span style={{ fontWeight: "bold" }}>
              {selectedGroup?.chat_name}
            </span>{" "}
          </Typography>
          <Box sx={{ mt: 2, mb: 2, pl: 1 }}>
            <InputBase
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="search a member"
              sx={{
                borderBottom: "2px solid #2167f2",
              }}
            />
          </Box>
          <Box display={"flex"} flexWrap={"wrap"} gap={0.5} mb={2}>
            {selectedFriends.map((friend) => (
              <Box
                display="flex"
                alignItems="center"
                component={"div"}
                sx={(theme) => ({
                  bgcolor: "#2576da",
                  borderRadius: 5,
                  p: 0.5,
                })}
              >
                <Avatar
                  alt={friend.user.username}
                  src={friend.profile_picture}
                  sx={{
                    width: 22,
                    height: 22,
                  }}
                />
                <span>{friend.user.username}</span>
                <IconButton onClick={() => removeSelectedFriend(friend)}>
                  <Close
                    sx={{
                      width: 15,
                      height: 15,
                    }}
                  />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Box mb={1}>
            {friends.map((friend) => (
              <Box
                onClick={() => {
                  if (!selected(friend) && !isGroupMember(friend)) {
                    handleClick(friend);
                  }
                }}
                display={"flex"}
                sx={(theme) => ({
                  cursor: "pointer",
                  bgcolor: selected(friend) ? "#83b2ec" : "#ccc",
                  mb: 0.5,
                  p: 1,
                  borderRadius: 2,
                })}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={1}
              >
                <Avatar
                  alt={friend.user.username}
                  src={friend.profile_picture}
                />
                <Box flex={1} display={"flex"} flexDirection={"column"}>
                  <Typography flex={1}>{friend.user.username}</Typography>
                  {isGroupMember(friend) && (
                    <span style={{ color: "#2167f2" }}>Already Member</span>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
          {!loading ? (
            <Box display={"flex"} justifyContent={"space-between"}>
              <Button
                variant="contained"
                startIcon={<Close />}
                onClick={() => setOpen(false)}
                color="error"
              >
                Close
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                disabled={Boolean(selectedFriends.length < 1)}
                onClick={handleAddMembers}
              >
                Save
              </Button>
            </Box>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default GroupAddMember;
