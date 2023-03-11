import { Box, Dialog, Paper, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Cancel, Save } from "@mui/icons-material";

type Props = {
  open: boolean;
  onClose: () => void;
  //   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateGroupDialog = (props: Props) => {
  const { open, onClose } = props;
  const [name, setName] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setName(e.target.value);
  };

  const handleGroupCreate = () => {
    onClose();
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
        <TextField
          label="Group Name"
          placeholder="Enter the group name to be created"
          fullWidth
          value={name}
          onChange={handleChange}
        />
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
            endIcon={<Cancel />}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={Boolean(!name)}
            variant="contained"
            endIcon={<Save />}
            onClick={handleGroupCreate}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CreateGroupDialog;
