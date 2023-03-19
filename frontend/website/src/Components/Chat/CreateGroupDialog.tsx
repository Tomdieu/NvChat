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

type Props = {
  open: boolean;
  onClose: () => void;
  //   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateGroupDialog = (props: Props) => {
  const { open, onClose } = props;
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const iconRef = useRef();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setName(e.target.value);
  };

  const handleGroupCreate = () => {
    setLoading(true);

    ApiService.createGroup(JSON.stringify({ chat_name: name }), "")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.detail) {
          alert(data.detail);
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
    // onClose();
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
          <Box sx={{ cursor: "pointer", position: "relative" }}>
            <Avatar ref={iconRef} />
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
          ref={iconRef}
        />
      </Box>
    </Dialog>
  );
};

export default CreateGroupDialog;
