import React from "react";
import { useStyles } from "./styles";
import Share from "Components/share/Share";
import Post from "Components/Post/Post";

type Props = {};

const Feed = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.feedContainer}>
      <div className={classes.feedWrapper}>
        <Share />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Feed;
