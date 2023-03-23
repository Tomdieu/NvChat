import { Avatar, Box, BoxProps, IconButton, Typography } from "@mui/material";

import { useStyles } from "./styles";
import { MoreVert } from "@mui/icons-material";
import React, { useMemo } from "react";

type Typing = {
  sender: string;
  message: string;
};

type Props = {
  name: string;
  typing?: Typing;
  icon: string;
} & BoxProps;

const ChatTopbar = (props: Props) => {
  const classes = useStyles();
  const { name, typing, icon, onClick, ...other } = props;
  const isTyping = useMemo(() => Boolean(typing), [typing]);
  return (
    <Box className={classes.topbar} {...other}>
      <Box className={classes.topbarWrapper}>
        <Avatar className={classes.topbarImg} src={icon} alt={name} />
        <Box className={classes.topbarCenter} onClick={onClick}>
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: "bold" }}>
            {name}
          </Typography>
          {isTyping && (
            <Typography
              variant="subtitle2"
              noWrap
              sx={{
                letterSpacing: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontStyle: "italic",
                color: "#d5d2d2",
              }}
            >
              {typing.message}
            </Typography>
          )}
        </Box>
        <Box className={classes.topbarIcons}>
          {/* <IconButton className={classes.topbarIcon}>
            <Call />
          </IconButton> */}
          <IconButton className={classes.topbarIcon}>
            <MoreVert />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(ChatTopbar);
