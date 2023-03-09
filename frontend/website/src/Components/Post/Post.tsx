import React from "react";
import { useStyles } from "./styles";
import { Avatar, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

type Props = {};

const Post = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.post}>
      <div className={classes.postWrapper}>
        <div className={classes.postTop}>
          <div className={classes.postTopLeft}>
            <Avatar className={classes.postProfileImg} />
            <span className={classes.postUsername}>ivantom</span>
            <span className={classes.postDate}>5 mins ago</span>
          </div>
          <div className={classes.postTopRight}>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
        <div className={classes.postCenter}>
          <span className={classes.postText}>Hey Its my first post</span>
          <img className={classes.postImg} src="/assets/chat-icon-512.png" />
        </div>
        <div className={classes.postBottom}>
          <div className={classes.postBottomLeft}>
            <img className={classes.likeIcon} src="assets/chat-icon-64.png" />
            <img className={classes.likeIcon} src="assets/chat-icon-64.png" />
            <span className={classes.likeCounter}>45k People like</span>
          </div>
          <div className={classes.postBottomRight}>
            <span className={classes.postCommentText}>12k comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
