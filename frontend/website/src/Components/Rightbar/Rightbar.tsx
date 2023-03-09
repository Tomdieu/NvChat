import React from "react";
import { useStyles } from "./styles";
import { Avatar } from "@mui/material";

type Props = {};

const Rightbar = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.rightBarContainer}>
      <div className={classes.rightbarWrapper}>
        {/* <div className={classes.birthdayContainer}>
          <Avatar />
          <span className={classes.birthdayText}>
            <b>Ivan Tom</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div> */}
        <h4 className={classes.rightbarTitle}>Online Friends</h4>
        <ul className={classes.rightbarFriendList}>
          <li className={classes.rightbarFriend}>
            <div className={classes.rightbarProfileImgContainer}>
              <img
                className={classes.rightbarProfileImg}
                src="/assets/logo.svg"
                alt=""
              />
              <span className={classes.rightbarOnline}></span>
            </div>
            <span className={classes.rightbarUsername}>Ivan Tom</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Rightbar;
