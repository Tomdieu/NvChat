import { Box, Typography } from "@mui/material";
import FileViewer from "Components/FileViewer/FileViewer";
import React from "react";
import ReactPlayer from "react-player";
import { GroupMessageSerializer } from "types/GroupMessageSerializer";
import { Message } from "types/Message";

type Props = {
  message: GroupMessageSerializer | Message;
  isMine?: Boolean;
};

const ParentMessage = (props: Props) => {
  const { message, isMine = false } = props;
  return (
    <Box
      sx={{
        borderRadius: 2,
        borderLeft: "3px solid #1f72ef",
        opacity: ".8",
        backgroundColor: "#d8d5d5",
        pl: 1,
      }}
      display={"flex"}
      flexDirection={"column"}
    >
      {!isMine && (
        <Box>
          <span>~ {message?.sender.user.username}</span>
        </Box>
      )}
      <Box display={"flex"} flex={1} pb={0.5} pt={0.8}>
        {message?.message?.resourcetype === "ImageMessage" && (
          <>
            <img
              src={message?.message?.image}
              width={75}
              height={50}
              style={{ objectFit: "contain" }}
            />
            <Typography
              component={"p"}
              noWrap
              textOverflow={"ellipsis"}
              maxWidth={"70%"}
            >
              {message?.message?.caption}
            </Typography>
          </>
        )}

        {message?.message?.resourcetype === "VideoMessage" && (
          <>
            <ReactPlayer
              url={message?.message?.video}
              width={100}
              height={50}
              // controls
              // playing
              style={{ objectFit: "contain" }}
            />
            <Typography
              component={"p"}
              noWrap
              textOverflow={"ellipsis"}
              maxWidth={"70%"}
            >
              {message?.message?.caption}
            </Typography>
          </>
        )}

        {message?.message?.resourcetype === "FileMessage" && (
          <>
            <Typography>File</Typography>
            <Typography
              component={"p"}
              noWrap
              textOverflow={"ellipsis"}
              maxWidth={"70%"}
            >
              {message?.message?.caption}
            </Typography>
          </>
        )}

        {message?.message?.resourcetype === "TextMessage" && (
          <Typography
            component={"p"}
            noWrap
            textOverflow={"ellipsis"}
            maxWidth={"99%"}
          >
            {message?.message?.text}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(ParentMessage);
