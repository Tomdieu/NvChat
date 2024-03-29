import { Block, Close, Phone, VideoCall } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useChat } from "context/ChatContext";
import React, { useMemo } from "react";
import { useStyles } from "./styles";
import moment from "moment";

type Props = {};

const ChatRightbar = (props: Props) => {
  const { isRightOpen, setIsRightOpen } = useChat();
  const { selectedDiscussion } = useChat();
  const classes = useStyles();
  const r = useMemo(() => {
    return Math.round(Math.random() * 254);
  }, []);
  const g = useMemo(() => {
    return Math.round(Math.random() * 254);
  }, []);
  const b = useMemo(() => {
    return Math.round(Math.random() * 254);
  }, []);

  const a = useMemo(() => {
    return Math.random();
  }, []);
  return (
    <Grid
      className={classes.rightbar}
      item
      md={isRightOpen ? 3 : 0}
      display={isRightOpen ? "block" : "none"}
    >
      <Box className={classes.rightbarWrapper}>
        <Box className={classes.rightbarTop}>
          <IconButton onClick={() => setIsRightOpen(false)}>
            <Close />
          </IconButton>
          <span>{selectedDiscussion.title.toLocaleUpperCase()} Detail</span>
        </Box>
        <Box className={classes.rightbarBottom}>
          <Box
            component={Paper}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            p={5}
            sx={{ borderRadius: 0, with: "100%" }}
          >
            {selectedDiscussion.imageUrl && (
              <img
                src={selectedDiscussion.imageUrl}
                className={classes.image}
              />
            )}
            {!selectedDiscussion.imageUrl && (
              <Avatar
                sx={{
                  width: 300,
                  height: 300,
                  backgroundColor: `rgba(${r},${g},${b},${a})`,
                }}
              >
                <Typography variant="h1">
                  {selectedDiscussion.title.charAt(0).toUpperCase()}
                </Typography>
              </Avatar>
            )}

            <span className={classes.title}>{selectedDiscussion.title}</span>
            <Box
              width={"100%"}
              display={"flex"}
              gap={5}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
                alignItems={"center"}
                sx={{
                  cursor: "pointer",
                  "& > *": {
                    color: "#306ee8",
                  },
                }}
              >
                <Phone />
                <span>Audio</span>
              </Box>
              <Box
                sx={{
                  cursor: "pointer",
                  "& > *": {
                    color: "#306ee8",
                  },
                }}
                flexDirection={"column"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <VideoCall />
                <span>Video</span>
              </Box>
            </Box>
          </Box>
          <Box component={Paper} p={2} mt={1} sx={{ borderRadius: 0 }}>
            <Typography>
              {selectedDiscussion.user.bio || "Hello i am using NvChat"}
            </Typography>
            <Typography color="GrayText">
              {moment(selectedDiscussion.created_at).format("DD MMMM YYYY")}
            </Typography>
          </Box>
          <Box component={Paper} sx={{ borderRadius: 0 }} p={2} mt={1}>
            <Typography color={"GrayText"}>
              {selectedDiscussion.groups_in_common.length} Groups in common
            </Typography>
            <Box>
              {selectedDiscussion?.groups_in_common?.map((group) => (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap={2}
                  p={0.5}
                  sx={{
                    "&:hover": { backgroundColor: "#d4cecec2" },
                    borderRadius: 2,
                    cursor: "pointer",
                  }}
                >
                  <Avatar src={group.image} alt={group.chat_name} />
                  <Box flex={1} display={"flex"} flexDirection={"column"}>
                    <Typography variant="h6">{group.chat_name}</Typography>
                    <Typography
                      color={"GrayText"}
                      noWrap
                      textOverflow={"ellipsis"}
                      maxWidth={"100%"}
                      variant="caption"
                    >
                      {group.members}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box p={0.5} component={Paper} mt={1}>
            <Box
              display={"flex"}
              gap={2}
              alignItems={"center"}
              sx={{
                p: 2,
                cursor: "pointer",
                transition: "all .5s ease",
                "&:active": {
                  bgcolor: "#80808075",
                },
                "& > *": { color: "red" },
              }}
            >
              <Block />
              <Typography>Un Friend {selectedDiscussion.title}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default React.memo(ChatRightbar);
