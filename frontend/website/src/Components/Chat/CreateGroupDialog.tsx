import {
  Box,
  Dialog,
  Paper,
  Button,
  TextField,
  Typography,
  Avatar,
  IconButton,
  InputBase,
  CircularProgress,
} from "@mui/material";
import React, { useRef, useState } from "react";
import {
  Camera,
  CameraEnhance,
  Cancel,
  EmojiEmotions,
  Save,
} from "@mui/icons-material";
import ApiService from "utils/ApiService";
import { useAuth } from "context/AuthContext";
import { useGroup } from "context/GroupContext";

type Props = {
  open: boolean;
  onClose: () => void;
  //   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateGroupDialog = (props: Props) => {
  const { open, onClose } = props;
  const [name, setName] = useState("");
  const [groupImage, setGroupImage] = useState<File>(null);

  const [loading, setLoading] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);

  const { userToken } = useAuth();
  const { setGroups } = useGroup();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setName(e.target.value);
  };

  const handleGroupCreate = () => {
    setLoading(true);

    const formData = new FormData();

    formData.append("chat_name", name);
    if (groupImage) {
      formData.append("image", groupImage);
    }

    ApiService.createGroup(formData, userToken)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.detail) {
          alert(data.detail);
        } else {
          setGroups((groups) => [...groups, data.data]);
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });
  };

  const handleSelectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    setGroupImage(file);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const dataUrl = fileReader.result;
      iconRef.current.src = dataUrl.toString();
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} fullWidth hideBackdrop>
      <Box
        component={Paper}
        sx={(theme) => ({
          p: theme.spacing(1),
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1),
        })}
      >
        <Typography variant="h4" textAlign="center" fontFamily={"fantasy"}>
          Chat Group
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Box
            sx={{ cursor: "pointer", position: "relative" }}
            onClick={() => fileRef.current.click()}
          >
            <img
              ref={iconRef}
              src="src\assets\group-image.png"
              alt=""
              width={50}
              height={50}
              style={{ borderRadius: "50%", border: "1px solid grey" }}
            />
          </Box>
          <InputBase
            // label="Group Name"
            placeholder="Enter the group name to be created"
            fullWidth
            value={name}
            onChange={handleChange}
            sx={{
              borderBottom: "2px solid gray",
              pl: 0.8,
              pr: 0.8,
              lineHeight: "18px",
              fontSize: "18px",
              "&:focus-within": { borderBottomColor: "#5376f0" },
            }}
          />
          <IconButton>
            <EmojiEmotions />
          </IconButton>
        </Box>

        {/* <TextField
          label="Description"
          placeholder="Enter group description"
          multiline
          maxRows={10}
        /> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            color="error"
            startIcon={<Cancel />}
            onClick={onClose}
            disabled={loading}
          >
            Close
          </Button>
          {loading ? (
            <CircularProgress
              aria-labelledby="btn-create-group"
              id="btn-create-group"
              aria-busy={true}
            />
          ) : (
            <Button
              id="btn-create-group"
              disabled={Boolean(name.length <= 3)}
              variant="contained"
              endIcon={<Save />}
              onClick={handleGroupCreate}
              aria-controls={loading ? "btn-create-group" : undefined}
            >
              Create
            </Button>
          )}
        </Box>
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={handleSelectedFile}
        />
      </Box>
    </Dialog>
  );
};

export default CreateGroupDialog;
