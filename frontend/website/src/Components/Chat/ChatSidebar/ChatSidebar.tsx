import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { useStyles } from "./styles";
import { Message, MoreVert, Search } from "@mui/icons-material";
import { useChat } from "context/ChatContext";
import { Conversation } from "types/ConversationSerializer";
import ChatLatestMessage from "./ChatLatestMessage";
import moment from "moment";
import Discussion from "./Discussion";
import ApiService from "utils/ApiService";
import CreateDiscussion from "./CreateDiscussion";

type Props = {};

const ChatSidebar = (props: Props) => {
  const classes = useStyles();

  const {
    discussions,
    chatId,
    setChatId,
    setSelectedDiscussion,
    setDiscussions,
  } = useChat();

  const [filterDiscussions, setFilterDiscussions] = React.useState<
    Conversation[]
  >([]);

  const [searchName, setSearchName] = React.useState<string>("");

  const [loading, setLoading] = React.useState<boolean>();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setLoading(true);
      ApiService.getDiscussions(token)
        .then((res) => res.json())
        .then((data) => {
          if (data.details === undefined) {
            setDiscussions(data);
            setFilterDiscussions(data);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    if (searchName) {
      setFilterDiscussions(
        discussions.filter((disc) => disc.title.match(searchName))
      );
    } else {
      setFilterDiscussions(discussions);
    }
  }, [searchName]);

  return (
    <Grid item md={3} height={"100vh"} className={classes.sidebar}>
      <Box className={classes.sidebarWrapper}>
        <Box className={classes.sidebarTop}>
          <Typography className={classes.title} variant="h4">
            Nv Chat
          </Typography>
          <IconButton className={classes.iconBtn}>
            <MoreVert />
          </IconButton>
        </Box>
        <CreateDiscussion open={open} onClose={handleClose} />
        <Box className={classes.sidebarBottom}>
          <Box className={classes.searchWrapper}>
            <Search className={classes.icon} />
            <Divider flexItem orientation="vertical" />
            <InputBase
              componentsProps={{
                input: {
                  style: {
                    paddingLeft: 5,
                    paddingRight: 5,
                  },
                },
              }}
              placeholder="Search a friend"
              fullWidth
              className={classes.searchInput}
              value={searchName}
              onChange={handleChange}
            />
          </Box>
          <Box flex={10} position={"relative"} overflow={"auto"}>
            <Box className={classes.fab}>
              <IconButton onClick={() => setOpen(true)}>
                <Message />
              </IconButton>
            </Box>
            <Box className={classes.discussionList}>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  {filterDiscussions?.map((disc) => (
                    <Discussion
                      disc={disc}
                      key={disc.id}
                      sx={{ bgcolor: chatId === disc.id ? "#1658ca" : "#ccc" }}
                      onClick={() => {
                        setSelectedDiscussion(disc);
                        setChatId(disc.id);
                      }}
                    />
                  ))}
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default React.memo(ChatSidebar);
