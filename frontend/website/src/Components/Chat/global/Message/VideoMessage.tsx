import React, { useEffect, useRef } from "react";
import TextMessage from "./TextMessage";

type Props = {
  video: string;
  caption: string;
};

const VideoMessage = (props: Props) => {
  const { video, caption = "" } = props;
  const videoRef = useRef<HTMLVideoElement>(null!);
  return (
    <div>
      <video ref={videoRef} id="video" width={"100%"} controls>
        <source src={video} type="video/mp4" />
        <source src={video} type="video/webm" />
        <source src={video} type="video/ogg" />
        Your browser doesnot support Video tag
      </video>
      <TextMessage text={caption} />
    </div>
  );
};

export default VideoMessage;
