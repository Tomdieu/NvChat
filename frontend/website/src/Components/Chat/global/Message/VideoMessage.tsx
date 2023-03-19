import React, { useEffect, useRef } from "react";
import TextMessage from "./TextMessage";
import ReactPlayer from "react-player";
import { Box } from "@mui/material";

type Props = {
  video: string;
  caption: string;
};

const VideoMessage = (props: Props) => {
  const { video, caption = "" } = props;
  return (
    <Box>
      <ReactPlayer url={video} controls width={"100%"} />
      <TextMessage text={caption} />
    </Box>
  );
};

export default VideoMessage;
