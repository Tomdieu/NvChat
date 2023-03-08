import React from "react";
import { useStyles } from "./styles";
import { Avatar, InputBase } from "@mui/material";

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
          />
        </div>
        <hr className={classes.shareHr} />
        <div className={classes.shareBottom}></div>
      </div>
    </div>
  );
};

export default Share;
