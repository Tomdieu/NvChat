import { Box, Paper } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";
import { useGroup } from "Context/GroupContext";
import { CameraAltOutlined } from "@mui/icons-material";

import { BsDot } from "react-icons/bs";

type Props = {};

const GroupHead = (props: Props) => {
  const classes = useStyles();
  const { selectedGroup } = useGroup();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const handleChangeIcon = () => {
    fileRef.current.click();
  };
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const files = e.target.files;

    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      const fileReader = new FileReader();

      fileReader.onload = () => {
        imageRef.current.src = fileReader.result;
      };

      fileReader.readAsDataURL(file);
    }
  };
  return (
    <Box className={classes.rightbarCenter} component={Paper} elevation={0}>
      <div style={{ position: "relative" }} className="iconContainer">
        <img
          src={selectedGroup?.image}
          ref={imageRef}
          alt=""
          className={classes.groupIcon}
        />
        <div className="hover" onClick={handleChangeIcon}>
          <CameraAltOutlined style={{ fontSize: "100px", color: "grey" }} />
          <span>Change Group Icon</span>
        </div>
      </div>
      <span className={classes.groupName}>{selectedGroup?.chat_name}</span>
      <span className={classes.groupMemberDetail}>
        <span>Group</span>
        <span>
          {" "}
          <BsDot />{" "}
        </span>
        <span>{selectedGroup?.group_members.length} Member</span>
      </span>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleIconChange}
      />
    </Box>
  );
};

export default GroupHead;
