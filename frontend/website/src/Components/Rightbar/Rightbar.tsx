import React from "react";
import { useStyles } from "./styles";

type Props = {};

const Rightbar = (props: Props) => {
  const classes = useStyles();
  return <div className={classes.rightBarContainer}>Rightbar</div>;
};

export default Rightbar;
