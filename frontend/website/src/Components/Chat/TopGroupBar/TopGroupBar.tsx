import { Avatar, Box, BoxProps, IconButton, Typography } from "@mui/material";

import { useStyles } from "./styles";
import { Call, MoreVert } from "@mui/icons-material";
import { GroupMember } from "types/GroupMember";
import { useAuth } from "Context/AuthContext";

type Typing = {
  sender: string;
  message: string;
};

type Props = {
  name: string;
  participants?: GroupMember[];
  typing?: Typing;
  icon: string;
} & BoxProps;

const TopGroupBar = (props: Props) => {
  const classes = useStyles();
  const { name, participants, typing, icon, ...other } = props;
  const isTyping = Boolean(typing);
  return (
    <Box className={classes.topbar} {...other}>
      <Box className={classes.topbarWrapper}>
        <Avatar className={classes.topbarImg} src={icon} alt={name} />
        <Box className={classes.topbarCenter}>
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: "bold" }}>
            {name}
          </Typography>
          {!isTyping ? (
            <Typography
              variant="subtitle2"
              noWrap
              sx={{
                letterSpacing: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {participants?.map((participant, index) => (
                <span key={index}>
                  {participant.user.user.username}
                  {","}
                </span>
              ))}
            </Typography>
          ) : (
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

export default TopGroupBar;
