import { RemoveRedEye } from "@mui/icons-material";
import { Box, IconButton, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";

type Props = {} & TextFieldProps;

const PasswordInput = (props: Props) => {
  const { value, ...other } = props;
  const [type, setType] = useState<"text" | "password">("password");
  const toggleType = () => {
    if (type === "password") return setType("text");
    setType("password");
  };
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <TextField type={type} fullWidth {...other} />
      {value && (
        <Box
          sx={{
            position: "absolute",
            top: 4,
            right: 1.8,
            // bottom: 2,
            zIndex: 999,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,.3)",
            backdropFilter: "blur(8px)",
            p: 0.2,
            // lineHeight: 32,
          }}
        >
          <IconButton onClick={toggleType}>
            <RemoveRedEye />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default PasswordInput;
