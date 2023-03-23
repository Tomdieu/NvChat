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

// import Video from "assets/video.mp4";
import VideoMessage from "./VideoMessage";
import { GroupMessageSerializer } from "types/GroupMessageSerializer";
import AudioMessage from "./AudioMessage";
import { Message } from "types/Message";
import moment from "moment";
import FileMessage from "./FileMessage";

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
  discussionMessage?: Message;
  onClick?: (e: React.MouseEvent<HTMLLIElement>, message: Message) => void;
};

const DiscussionMessage = (props: Props) => {
  const { isMine = false, discussionMessage, onClick } = props;

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

  const isText = Boolean(
    discussionMessage?.message.resourcetype === "TextMessage"
  );
  const isAudio =
    discussionMessage?.message.resourcetype === "FileMessage" &&
    getExt(discussionMessage?.message.file) === "mp3";
  const isImage = Boolean(
    discussionMessage?.message.resourcetype === "ImageMessage"
  );

  const isVideo = Boolean(
    discussionMessage?.message.resourcetype === "VideoMessage"
  );
  const isPdf =
    discussionMessage?.message.resourcetype === "FileMessage" &&
    getExt(discussionMessage?.message.file) === "pdf";

  const open = Boolean(anchorEl);
  return (
    <Box
      id={"message_" + discussionMessage.id}
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
          <span style={{ fontWeight: "600", cursor: "pointer" }}>
            ~ {discussionMessage.sender.user.username}
          </span>
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
        {isText &&
          discussionMessage?.message.resourcetype === "TextMessage" && (
            <TextMessage text={discussionMessage.message.text} />
          )}
        {isImage &&
          discussionMessage?.message.resourcetype === "ImageMessage" && (
            <PhotoMessage
              caption={discussionMessage.message.caption}
              image={discussionMessage.message.image}
            />
          )}
        {isAudio &&
          discussionMessage?.message.resourcetype === "FileMessage" && (
            <AudioMessage
              audio={discussionMessage.message.file}
              caption={discussionMessage.message.caption}
            />
          )}
        {isVideo &&
          discussionMessage?.message.resourcetype === "VideoMessage" && (
            <VideoMessage
              video={discussionMessage.message.video}
              caption={discussionMessage.message.caption}
            />
          )}
        {isPdf && discussionMessage?.message.resourcetype === "FileMessage" && (
          <FileMessage
            caption={discussionMessage.message.caption}
            file={discussionMessage.message.file}
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <span>{moment(discussionMessage.timestamp).format("HH:MM a")}</span>
        </div>
        <Menu
          id="message-menu"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{ "aria-labelledby": "message-menu" }}
          onClose={handleClose}
        >
          <MenuItem
            onClick={(e) => {
              onClick(e, discussionMessage);
              handleClose();
            }}
          >
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

          <MenuItem
            sx={{ display: !isMine ? "none" : "block" }}
            onClick={handleClose}
          >
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

          <Divider sx={{ display: !isMine ? "none" : "block" }} />
          <MenuItem
            sx={{ display: !isMine ? "none" : "block" }}
            onClick={handleClose}
          >
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
          <MenuItem
            sx={{ display: !isMine ? "none" : "block" }}
            onClick={handleClose}
          >
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
        </Menu>
      </Box>
    </Box>
  );
};

export default React.memo(DiscussionMessage);
