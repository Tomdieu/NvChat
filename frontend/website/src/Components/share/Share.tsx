import React from "react";
import { useStyles } from "./styles";
import { Avatar, InputBase } from "@mui/material";
import { EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material";

type Props = {};

const Share = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.share}>
      <div className={classes.shareWrapper}>
        <div className={classes.shareTop}>
          <Avatar className={classes.shareProfileImg} />
          <input
            className={classes.shareInput}
            placeholder="What's in your mine ?"
            multiple
            max={10000}
          />
        </div>
        <hr className={classes.shareHr} />
        <div className={classes.shareBottom}>
          <div className={classes.shareOptions}>
            <div className={classes.shareOption}>
              <PermMedia htmlColor="tomato" className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Photo or Video</span>
            </div>
            <div className={classes.shareOption}>
              <Label htmlColor="#0e4bf1" className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Tag</span>
            </div>
            <div className={classes.shareOption}>
              <Room htmlColor="green" className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Location</span>
            </div>
            <div className={classes.shareOption}>
              <EmojiEmotions htmlColor="gold" className={classes.shareIcon} />
              <span className={classes.shareOptionText}>Feellings</span>
            </div>
          </div>
          <button className={classes.shareButton}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default Share;
