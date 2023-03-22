import { Box, BoxProps, Divider, Typography } from "@mui/material";
import React from "react";
import ReactPlayer from "react-player";
import { GroupMessageSerializer } from "types/GroupMessageSerializer";
import { Message } from "types/Message";

type Props = {
  message: GroupMessageSerializer | Message;
};

const getExt = (file: string) => {
  const f = file.split(".");
  return f[f.length - 1];
};

const Wrapper = ({
  message,
  children,
  sx,
  ...others
}: Props & BoxProps): JSX.Element => {
  return (
    <Box
      sx={{
        ...{
          borderRadius: 2,
          width: "100%",
        },
        ...sx,
      }}
      {...others}
    >
      <span style={{ color: "grey" }}>{message.sender.user.username}</span>
      <Divider sx={{ mr: 5 }} />
      {children}
    </Box>
  );
};

const VideoMessage = ({ message }: Props): JSX.Element => {
  return (
    <Wrapper
      message={message}
      sx={{
        // borderLeft: "2px solid #1e77eb",
        borderRadius: 2,
        // paddingLeft: 2,
        width: "100%",
      }}
    >
      <Box display={"flex"} alignItems={"flex-end"} sx={{ m: 0, p: 0 }}>
        <ReactPlayer
          url={message.message.video}
          width={"100px"}
          height={"100px"}
        />
        <Typography
          noWrap
          maxWidth={"50%"}
          textOverflow={"ellipsis"}
          component={"p"}
          sx={{ color: "grey", borderRadius: 5, pl: 1 }}
        >
          {message.message.caption}
        </Typography>
      </Box>
    </Wrapper>
  );
};
const ImageMessage = ({ message }: Props): JSX.Element => {
  return (
    <Wrapper
      message={message}
      sx={{
        borderRadius: 2,
        width: "100%",
      }}
    >
      <Box display={"flex"} alignItems={"flex-end"}>
        <img
          alt={message.message.caption}
          src={message.message.image}
          style={{
            maxWidth: "50px",
          }}
        />
        <Typography
          noWrap
          maxWidth={"50%"}
          textOverflow={"ellipsis"}
          component={"p"}
          sx={{ color: "grey", borderRadius: 5, pl: 1 }}
        >
          {message.message.caption}
        </Typography>
      </Box>
    </Wrapper>
  );
};

const TextMessage = ({ message }: Props): JSX.Element => {
  return (
    <Wrapper
      message={message}
      sx={{
        // borderLeft: "2px solid #1e77eb",
        // borderRadius: 2,
        // paddingLeft: 2,
        width: "100%",
      }}
    >
      <Typography
        noWrap
        maxWidth={"50%"}
        textOverflow={"ellipsis"}
        component={"p"}
        sx={{ color: "grey", borderRadius: 5 }}
      >
        {message.message.text}{" "}
      </Typography>
    </Wrapper>
  );
};

const AudioMessage = ({ message }: Props): JSX.Element => {
  return;
};

const FileMsg = ({ message }: Props): JSX.Element => {
  return;
};

const GroupMessageReply = (props: Props) => {
  const { message } = props;

  const MsgComponent = {
    TextMessage: <TextMessage message={message} />,
    VideoMessage: <VideoMessage message={message} />,
    ImageMessage: <ImageMessage message={message} />,
    FileMessage: <FileMsg message={message} />,
  };

  return MsgComponent[message.message.resourcetype];
};

export default GroupMessageReply;
