import React from "react";
import { useStyles } from "./styles";
import Share from "Components/share/Share";

type Props = {};

const Feed = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.feedContainer}>
      <div className={classes.feedWrapper}>
        <Share />
      </div>
    </div>
  );
};

export default Feed;
