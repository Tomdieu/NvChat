import React from "react";
import { useStyles } from "./styles";
import { Avatar, Button, InputBase } from "@mui/material";
import { EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material";

type Props = {};

const Share = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.share}>
      <div className={classes.shareWrapper}>
        <div className={classes.shareTop}>
          <Avatar className={classes.shareProfileImg} />
          <InputBase
            className={classes.shareInput}
            placeholder="What's in your mine ?"
            multiline
            maxRows={4}
            sx={{
              "& ::-webkit-scrollbar": {
                width: 0,
              },
              "& ::-webkit-scrollbar-track": {},
            }}
          />
        </div>
        {/* <hr className={classes.shareHr} /> */}
        <div className={classes.shareBottom}>
          <div className={classes.shareOptions}>
            {/* <div className={classes.shareOption}>
              <PermMedia htmlColor="tomato" className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Photo or Video</span>
            </div> */}
            <Button
              startIcon={
                <PermMedia
                  sx={{ pl: 1 }}
                  htmlColor="tomato"
                  className={classes.shareIcon}
                />
              }
              color="warning"
              sx={{ borderRadius: 5, fontFamily: "Fira Code" }}
            >
              Photo or Video
            </Button>
            {/* <div className={classes.shareOption}>
              <Label htmlColor="#0e4bf1" className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Tag</span>
            </div> */}
            <Button
              startIcon={
                <Label
                  sx={{ pl: 1 }}
                  htmlColor="#0e4bf1"
                  className={classes.shareIcon}
                />
              }
              sx={{ borderRadius: 5, fontFamily: "Fira Code" }}
              size="large"
            >
              Tag
            </Button>
            {/* <div className={classes.shareOption}>
              <Room htmlColor="green" className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Location</span>
            </div> */}
            <Button
              startIcon={
                <Room
                  sx={{ pl: 1 }}
                  htmlColor="#3ce297"
                  className={classes.shareIcon}
                />
              }
              color="success"
              sx={{ borderRadius: 5, fontFamily: "Fira Code" }}
              size="large"
            >
              Location
            </Button>
            {/* <div className={classes.shareOption}>
              <EmojiEmotions htmlColor="gold" className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Feellings</span>
            </div> */}
            <Button
              startIcon={
                <EmojiEmotions
                  sx={{ pl: 1 }}
                  htmlColor="gold"
                  className={classes.shareIcon}
                />
              }
              size="large"
              sx={{ borderRadius: 5, fontFamily: "Fira Code" }}
            >
              Feellings
            </Button>
          </div>
          <Button
            color="success"
            // size="large"
            variant="contained"
            sx={{ borderRadius: 2, fontFamily: "Fira Code" }}
          >
            Share
          </Button>
          {/* <button className={classes.shareButton}>Share</button> */}
        </div>
      </div>
    </div>
  );
};

export default Share;
