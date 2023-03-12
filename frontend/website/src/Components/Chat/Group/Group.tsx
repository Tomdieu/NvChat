import { Avatar, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { GroupSerializer } from "types/GroupSerializer";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  groupItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1),
    backgroundColor: "#ccc",
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    // borderBottom: "1px solid #ddd",
    marginBottom: theme.spacing(0.5),
    margin: theme.spacing(1),
    "&:hover": {
      opacity: 0.8,
    },

    "&:active": {
      backgroundColor: "#4798fa",
    },
  },
  groupIcon: {},
  groupInfo: {
    flex: 1,
    paddingLeft: theme.spacing(1),
  },
  groupName: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  groupDateInfo: {
    color: "#fff",
  },
  groupLatestMessage: {
    fontSize: ".8em",
  },
}));

type Props = {
  group: null | undefined | GroupSerializer;
  onClick?: () => void;
};

const Group = (props: Props) => {
  const { group, onClick } = props;
  const classes = useStyles();
  const formattedDate = moment(group?.latest_message?.created_at).format(
    "DD/MM/YYYY"
  );

  const displayDate = moment(group?.latest_message?.created_at).isSame(
    new Date(),
    "day"
  )
    ? "Today"
    : formattedDate;
  return (
    <Box className={classes.groupItem} onClick={onClick}>
      <Avatar className={classes.groupIcon} src={group?.image} />
      <Box className={classes.groupInfo}>
        <Typography variant="h6" className={classes.groupName}>
          {group?.chat_name}
        </Typography>
        <Typography variant="caption" className={classes.groupLatestMessage}>
          {group?.latest_message?.message.created_at && <>Latest Message</>}
        </Typography>
      </Box>
      <Box className={classes.groupDateInfo}>
        {group?.latest_message?.message.created_at && displayDate}
      </Box>
    </Box>
  );
};

export default Group;
