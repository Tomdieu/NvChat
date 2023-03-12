import { Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import TopGroupBar from "../TopGroupBar/TopGroupBar";
import MessageInput from "../global/MessageInput/MessageInput";
import MessagesList from "../global/MessagesList/MessagesList";

type Props = {};

const GroupChat = (props: Props) => {
  const [message, setMessage] = useState<string | null>("Hello");
  const [replyMessage, setReplyMessage] = useState(null);
  const [typing, setTyping] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
    handleTyping();
  };

  const handleSend = () => {};

  const handleTyping = () => {};

  const handleFileClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.files);

    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const fileName = file.name.toLowerCase();

      const fileReader = new FileReader();

      fileReader.onload = (ev: ProgressEvent<FileReader>) => {
        const dataUrl = fileReader.result;
        console.log(dataUrl);

        const isImage =
          fileName.endsWith(".jpg") ||
          fileName.endsWith(".jpeg") ||
          fileName.endsWith(".png") ||
          fileName.endsWith(".gif");
        const isVideo =
          fileName.endsWith(".mp4") ||
          fileName.endsWith(".mov") ||
          fileName.endsWith(".avi") ||
          fileName.endsWith(".wmv");

        if (isVideo) {
          const videoMessage = {
            video: fileReader.result,
            caption: message || null,
            resourcetype: "VideoMessage",
          };
          // console.log(videoMessage);
          // webSocket.send(
          //   JSON.stringify({ message: videoMessage, filename: fileName })
          // );
        }
        if (isImage) {
          const imageMessage = {
            image: fileReader.result,
            caption: message || null,
            resourcetype: "ImageMessage",
          };
          // console.log(imageMessage);
          // webSocket.send(
          //   JSON.stringify({ message: imageMessage, filename: fileName })
          // );
        }

        if (!isImage && !isVideo) {
          const fileMessage = {
            file: fileReader.result,
            caption: message || null,
            resourcetype: "FileMessage",
          };
          // webSocket.send(
          //   JSON.stringify({ message: fileMessage, filename: fileName })
          // );
        }
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Grid
      item
      md={9}
      sm={8}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <TopGroupBar icon={""} />
      <MessagesList messages={[]} />
      <MessageInput
        text={message}
        onChange={handleChange}
        onFileClick={handleFileClick}
        onSendClick={handleSend}
      />
      <input
        style={{ display: "none" }}
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </Grid>
  );
};

export default GroupChat;
