import { Typography } from "@mui/material";
import { Message } from "types/Message";
import { TextMessage } from "types/AbstractMessage";

type Props = {
  message: any;
};

const LatestMessage = (props) => {
  const { message } = props;
  // console.log({ message });
  return (
    <>
      {message?.message.resourcetype === "TextMessage" && (
        <Typography noWrap sx={{width:290 }}>
          {message.sender.user.username} : {message.message.text}
        </Typography>
      )}
      {message?.message.resourcetype === "ImageMessage" && (
        <Typography>
          {message.sender.user.username} : {`send an image`}
        </Typography>
      )}
      {message?.message.resourcetype === "FileMessage" && (
        <Typography>
          {message.sender.user.username} : {`send an file`}
        </Typography>
      )}
      {message?.message.resourcetype === "VideoMessage" && (
        <Typography>
          {message.sender.user.username} : {`send an video`}
        </Typography>
      )}
    </>
  );
};

export default LatestMessage;
