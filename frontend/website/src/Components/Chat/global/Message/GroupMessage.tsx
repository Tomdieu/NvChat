import {
  Box,
  IconButton,
  Paper,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import {
  Check,
  Delete,
  Edit,
  MoreHoriz,
  RemoveRedEye,
  ReplySharp,
} from "@mui/icons-material";

import { makeStyles } from "@mui/styles";
import TextMessage from "./TextMessage";
import PhotoMessage from "./PhotoMessage";

import Logo from "assets/logo.svg";
// import Video from "assets/video.mp4";
import VideoMessage from "./VideoMessage";
import { GroupMessageSerializer } from "types/GroupMessageSerializer";
import AudioMessage from "./AudioMessage";

export const useStyles = makeStyles((theme) => ({
  messageWrapper: {
    display: "flex",
    width: "100%",
    // justifyContent: "flex-end",
    padding: "9px 5px",
    alignItems: "flex-end",
    gap: theme.spacing(0.8),
  },
}));

type Props = {
  isMine: Boolean;
  groupMessage?: GroupMessageSerializer;
};

const GroupMessage = (props: Props) => {
  const { isMine = false, groupMessage } = props;
  const classes = useStyles({ isMine });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getExt = (filename: string) => {
    return filename.split(".")[1];
  };

  const isText = Boolean(groupMessage?.message.resourcetype === "TextMessage");
  const isAudio =
    Boolean(groupMessage?.message.resourcetype === "FileMessage") &&
    Boolean(getExt(groupMessage?.message.file) === "mp3");
  const isImage = Boolean(
    groupMessage?.message.resourcetype === "ImageMessage"
  );

  const isVideo = Boolean(
    groupMessage?.message.resourcetype === "VideoMessage"
  );
  const isPdf =
    Boolean(groupMessage?.message.resourcetype === "FileMessage") &&
    Boolean(getExt(groupMessage?.message.file) === "pdf");

  const open = Boolean(anchorEl);
  return (
    <Box
      className={classes.messageWrapper}
      justifyContent={isMine ? "flex-end" : "flex-start"}
    >
      <Avatar sx={{ display: isMine ? "none" : "auto" }} />
      <Box component={Paper} sx={{ p: 0.5, maxWidth: "50%" }}>
        <div
          style={{
            borderBottom: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontWeight: "600", cursor: "pointer" }}>~ivantom</span>
          <IconButton
            id="message-menu"
            onClick={handleClick}
            aria-controls={open ? "message-menu" : undefined}
            aria-haspopup={"true"}
            aria-expanded={open ? "true" : undefined}
          >
            <MoreHoriz />
          </IconButton>
        </div>
        {isText && (
          <TextMessage text="from django.contrib.auth import get_user_model" />
        )}
        {isImage && <PhotoMessage caption={"This is an image"} image={Logo} />}
        {isAudio && <AudioMessage audio={""} caption={""} />}
        {isVideo && (
          <VideoMessage
            video={"/assets/video.mp4"}
            caption={"This is a video"}
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <span>19:20</span>
        </div>
        <Menu
          id="message-menu"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{ "aria-labelledby": "message-menu" }}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
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
              <ReplySharp />
              <Typography>Reply</Typography>
            </Box>
          </MenuItem>
          {isMine && (
            <>
              <MenuItem onClick={handleClose}>
                <Box
                  display="flex"
                  alignItems={"center"}
                  gap={5}
                  sx={{
                    "& > *": {
                      color: "#f5c875",
                    },
                  }}
                >
                  <RemoveRedEye />
                  <Typography>View By</Typography>
                </Box>
              </MenuItem>

              <Divider />
              <MenuItem onClick={handleClose}>
                <Box
                  display="flex"
                  alignItems={"center"}
                  gap={5}
                  sx={{
                    "& > *": {
                      color: "#1c72f2",
                    },
                  }}
                >
                  <Edit />
                  <Typography>Update</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Box
                  display="flex"
                  alignItems={"center"}
                  gap={5}
                  sx={{
                    "& > *": {
                      color: "red",
                    },
                  }}
                >
                  <Delete />
                  <Typography>Delete</Typography>
                </Box>
              </MenuItem>
            </>
          )}
        </Menu>
      </Box>
    </Box>
  );
};

export default GroupMessage;
