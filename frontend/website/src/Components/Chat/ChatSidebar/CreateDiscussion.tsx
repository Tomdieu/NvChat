import {
  Box,
  Button,
  Dialog,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreateDiscussion = (props: Props) => {
  const { open, onClose } = props;
  const [name, setName] = useState("");
  return (
    <Dialog open={open} fullWidth hideBackdrop>
      <Box component={Paper} p={1}>
        <Typography variant="h5">
          Select a friend and start discussing
        </Typography>
        <Box>
          <InputBase
            placeholder="Search a friend"
            sx={{
              mb: 1,
              mt: 1,
              pl: 0.5,
              border: "1px solid #c5c5c5",
              borderRadius: 1,
              fontSize: "1.2em",
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button onClick={onClose} color="error" variant="contained">
            Close
          </Button>
          <Button variant="contained">Start</Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CreateDiscussion;
