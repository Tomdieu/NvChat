import {
  Avatar,
  Box,
  Button,
  Dialog,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { useAuth } from "context/AuthContext";
import { useChat } from "context/ChatContext";
import React, { useEffect, useState } from "react";
import { UserProfile } from "types/UserProfile";
import ApiService from "utils/ApiService";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreateDiscussion = (props: Props) => {
  const { open, onClose } = props;
  const [name, setName] = useState("");
  const { userToken, userProfile } = useAuth();
  const [searchFriends, setSearchFriends] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const { discussions, setDiscussions, setChatId, setSelectedDiscussion } =
    useChat();
  useEffect(() => {
    if (name) {
      ApiService.searchUser(name, userToken)
        .then((res) => res.json())
        .then((data) => {
          setSearchFriends(
            data.filter((dt: UserProfile) => dt.id !== userProfile.id)
          );
        })
        .catch((err) => console.log(err));
    } else {
      setSearchFriends([]);
    }
  }, [name]);

  const handleFriendClick = (friend: UserProfile) => {
    const _selectedChat = discussions.find(
      (disc) => disc.user.id === friend.id
    );
    if (_selectedChat) {
      setSelectedDiscussion(_selectedChat);
      setChatId(_selectedChat.id);
      onClose();
    } else {
      setLoading(true);
      ApiService.createConversationWith({ with_user: friend.id }, userToken)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const _discussions = discussions;
          _discussions.push(data);
          setDiscussions(_discussions);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
          onClose();
        });
    }
  };

  return (
    <Dialog open={open} fullWidth hideBackdrop>
      <Box component={Paper} p={1}>
        <Typography variant="h4">
          Select a friend and start discussing
        </Typography>
        <Box>
          <InputBase
            placeholder="Search a friend"
            sx={{
              mb: 1,
              mt: 1,
              pl: 0.5,
              border: "1px solid #c5c5c5",
              borderRadius: 1,
              // fontSize: "1.2em",
              fontSize: 25,
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Box>
        <Box
          display={"flex"}
          flexDirection="column"
          gap={0.5}
          mb={2}
          overflow={"auto"}
          maxHeight={250}
        >
          {searchFriends.map((friend) => (
            <Box
              key={friend.id}
              display={"flex"}
              alignItems={"center"}
              gap={2}
              p={0.5}
              sx={{
                bgcolor: "#808080a8",
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
              onClick={() => handleFriendClick(friend)}
            >
              <Avatar alt={friend.user.username} src={friend.profile_picture} />
              <Box>
                <Typography fontWeight={"bold"}>
                  {friend.user.username}
                </Typography>
                <span>{friend.bio || "Hello i am using NvChat"}</span>
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button
            disabled={loading}
            onClick={onClose}
            color="error"
            variant="contained"
          >
            Close
          </Button>
          <Button disabled={loading} variant="contained">
            Start
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CreateDiscussion;
