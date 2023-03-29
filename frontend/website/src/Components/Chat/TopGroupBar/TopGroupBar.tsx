import { Avatar, Box, BoxProps, IconButton, Typography } from "@mui/material";

import { useStyles } from "./styles";
import { Call, MoreVert } from "@mui/icons-material";
import { GroupMember } from "types/GroupMember";
import { useAuth } from "context/AuthContext";

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
  const { name, participants, typing, icon, onClick, ...other } = props;
  const { userProfile } = useAuth();
  const isTyping = Boolean(typing);
  return (
    <Box className={classes.topbar} {...other}>
      <Box className={classes.topbarWrapper}>
        <Avatar className={classes.topbarImg} src={icon} alt={name} />
        <Box className={classes.topbarCenter} onClick={onClick}>
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: "bold" }}>
            {name}
          </Typography>
          {!isTyping ? (
            <Typography
              variant="subtitle2"
              noWrap
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {participants
                ?.map((participant, index) =>
                  participant.user.user.username === userProfile.user.username
                    ? "You"
                    : participant.user.user.username
                )
                .join(", ")}
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
