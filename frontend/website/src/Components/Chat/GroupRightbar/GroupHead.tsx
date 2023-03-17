import { Box, IconButton, Paper } from "@mui/material";
import React, { useState } from "react";
import { useStyles } from "./styles";
import { useGroup } from "Context/GroupContext";
import { CameraAltOutlined, Cancel, Save, SaveAlt } from "@mui/icons-material";

import { BsDot } from "react-icons/bs";
import ApiService from "Utils/ApiService";
import { useAuth } from "Context/AuthContext";

type Props = {};

const GroupHead = (props: Props) => {
  const classes = useStyles();
  const { selectedGroup, groups, setGroups, groupId, setSelectedGroup } =
    useGroup();
  const { userToken } = useAuth();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const [newImage, setNewImage] = useState<string>(null);

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
        setNewImage(fileReader.result.toString());
        imageRef.current.src = fileReader.result.toString();
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    imageRef.current.src = selectedGroup?.image;
    setNewImage(null);
  };

  const handleUpdatedImage = () => {
    const formData = new FormData();

    formData.append("image", fileRef.current.files[0]);

    ApiService.updateGroupImage(formData, selectedGroup.id, userToken)
      .then((res) => res.json())
      .then((data) => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");

        if (data.image) {
          const filteredGroup = groups.find(
            (group) => Number(group?.id) === groupId
          );

          filteredGroup.image = data.image;

          const othersGroups = groups.filter(
            (group) => Number(group?.id) !== groupId
          );

          othersGroups.push(filteredGroup);

          setSelectedGroup(filteredGroup);

          setGroups(othersGroups);
        }
      })
      .catch((err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      })
      .finally(() => setNewImage(null));
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
      {newImage && (
        <div>
          <IconButton onClick={handleCancel}>
            <Cancel color="error" />
          </IconButton>
          <IconButton onClick={handleUpdatedImage}>
            <Save color="primary" />
          </IconButton>
        </div>
      )}
      <span className={classes.groupName}>{selectedGroup?.chat_name}</span>
      <span className={classes.groupMemberDetail}>
        <span>Group</span>
        <BsDot />
        <span>{selectedGroup?.group_members?.length} Member</span>
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
