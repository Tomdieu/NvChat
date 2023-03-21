import {
  Box,
  IconButton,
  Menu,
  Paper,
  MenuItem,
  InputBase,
  ButtonGroup,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import { useGroup } from "context/GroupContext";
import {
  CameraAltOutlined,
  Cancel,
  Close,
  MoreVert,
  Save,
  SaveAlt,
  Update,
  UpdateRounded,
} from "@mui/icons-material";

import { BsDot } from "react-icons/bs";
import ApiService from "utils/ApiService";
import { useAuth } from "context/AuthContext";
import { GroupSerializer } from "types/GroupSerializer";

type Props = {};

const GroupHead = (props: Props) => {
  const classes = useStyles();
  const { selectedGroup, groups, setGroups, groupId, setSelectedGroup } =
    useGroup();
  const { userToken } = useAuth();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const [groupName, setGroupName] = useState("");
  const [isToUpdate, setIsToUpdate] = useState(false);

  const [newImage, setNewImage] = useState<string>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isOpen = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setGroupName(selectedGroup?.chat_name);
  }, [selectedGroup]);

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

  const handleChangeGroupName = () => {
    setIsToUpdate(true);
    handleClose();
  };

  const handleSaveGroupName = () => {
    if (groupName) {
      ApiService.updateGroup(
        { chat_name: groupName },
        selectedGroup.id,
        userToken
      )
        .then((res) => res.json())
        .then(() => {
          ApiService.getGroups(userToken)
            .then((res) => res.json())
            .then((data) => {
              setGroups(data.data);
              const groupData: GroupSerializer[] = data.data;

              const filterGroup = groupData.find(
                (dt) => dt.id === selectedGroup.id
              );
              setSelectedGroup(filterGroup);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsToUpdate(false);
          setGroupName("");
        });
    }
  };

  const handleUpdatedImage = () => {
    const formData = new FormData();

    formData.append("image", fileRef.current.files[0]);

    ApiService.updateGroupImage(formData, selectedGroup.id, userToken)
      .then((res) => res.json())
      .then((data) => {
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
      <div style={{ position: "absolute", top: 5, right: 0 }}>
        <IconButton
          id="group-menu"
          aria-controls={isOpen ? "group-menu" : undefined}
          aria-haspopup={"true"}
          aria-expanded={isOpen ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
      </div>
      <Menu
        id="group-menu"
        anchorEl={anchorEl}
        open={isOpen}
        MenuListProps={{ "aria-labelledby": "group-menu" }}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleChangeGroupName}>
          <span>Change group name</span>
        </MenuItem>
      </Menu>
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
      {isToUpdate ? (
        <Box
          sx={{ bgcolor: "#f5f5f5", p: 0.5, borderRadius: 2, display: "flex" }}
          display={"flex"}
          alignItems={"center"}
        >
          <InputBase
            placeholder="group name"
            value={groupName}
            fullWidth
            sx={{ pl: 1 }}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <ButtonGroup sx={{ bgcolor: "#d8d4d4" }}>
            <IconButton
              onClick={() => {
                setIsToUpdate(false);
                setGroupName("");
              }}
            >
              <Close color="error" />
            </IconButton>
            <IconButton
              onClick={handleSaveGroupName}
              disabled={!Boolean(groupName)}
            >
              <Save color={!Boolean(groupName) ? "disabled" : "info"} />
            </IconButton>
          </ButtonGroup>
        </Box>
      ) : null}
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
