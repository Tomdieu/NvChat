import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useAuthContext } from "context/AuthContext";

type Props = {
  message: any;
};

const Message = (props: Props) => {
  const { message } = props;
  const { userProfile } = useAuthContext();
  const isSender = message.sender.user.username === userProfile.user.username;
  return (
    <>
      {isSender ? (
        <div style={{ display: "flex", alignItems: "center",width:'100%',justifyContent: isSender ? "flex-end" : "flex-start", }}>
          <Box
            component={Paper}
            sx={{
              position: "relative",
              bgcolor: "#fff",
              borderRadius: "5px",
                
              m: 2,
              p: 2,
              "&::before": {
                content: '""',
                position: "absolute",
                width: "25px",
                height: "25px",
                right: -9,
                bottom: 10,
                backgroundColor: "#fff",

                transform: "rotate(45deg)",
              },
            }}
          >
            <Typography>{message.message.text}</Typography>
          </Box>
          <Avatar />
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center",width:'100%',justifyContent: isSender ? "flex-end" : "flex-start", }}>
          <Avatar />

          <Box
            component={Paper}
            sx={{
              //   maxWidth: "20%",
              position: "relative",
              bgcolor: "#fff",
              borderRadius: "5px",
              float: "right",
              m: 2,
              p: 2,
              "&::before": {
                content: '""',
                position: "absolute",
                width: "20px",
                height: "20px",
                left: -8,
                bottom: 12,
                backgroundColor: "#fff",

                transform: "rotate(45deg)",
              },
            }}
          >

            <p style={{marginRight:5}}>{message.message.text}</p>
          </Box>
        </div>
      )}
    </>
  );
};

export default Message;
