import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { GroupSerializer } from "types/GroupSerializer";
import moment from "moment";
import LatestMessage from "./LatestMessage";
import { useGroup } from "context/GroupContext";
import React, { useEffect, useLayoutEffect } from "react";
import ApiService from "utils/ApiService";
import { useAuth } from "context/AuthContext";
import { GroupMessageSerializer } from "types/GroupMessageSerializer";

const useStyles = makeStyles((theme) => ({
  groupItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1),
    backgroundColor: "#ccc",
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    marginBottom: theme.spacing(0.5),
    margin: theme.spacing(1),
    "&:hover": {
      opacity: 0.8,
    },

    "&:active": {
      backgroundColor: "#4798fa",
      "& > *,p": {
        color: "#fff",
      },
    },
    "& ::selection": {
      backgroundColor: "transparent",
    },
  },
  groupIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "1px solid #ccc",
    objectFit: "cover",
    backgroundColor: "#ffffff47",
  },
  groupInfo: {
    flex: 1,
    paddingLeft: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
  },
  groupName: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#fff",
    display: "block",
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
  const { groupId, setGroups } = useGroup();

  const [socket, setSocket] = React.useState<WebSocket>(null);

  const formattedDate = moment(group?.latest_message?.created_at).format(
    "DD/MM/YYYY"
  );

  const displayDate = moment(group?.latest_message?.created_at).isSame(
    new Date(),
    "day"
  )
    ? "Today"
    : formattedDate;

  const { userToken } = useAuth();

  useLayoutEffect(() => {
    (async () => {
      var ws: WebSocket;
      if (groupId != group.id) {
        ws = new WebSocket(
          ApiService.wsEndPoint +
            `ws/group_chat/${group.id}/?token=${userToken}`
        );
        setSocket(ws);
        return () => {
          ws.close();
        };
      } else {
        setSocket(null);
      }
    })();
  }, [groupId]);

  useLayoutEffect(() => {
    if (socket) {
      socket.onmessage = (message) => {
        const messageData = JSON.parse(message.data);
        if (messageData.typing === undefined) {
          const _groups = localStorage.getItem("groups");

          if (_groups) {
            const groups: GroupSerializer[] = JSON.parse(_groups);

            const filteredGroupChat: GroupSerializer = groups.find(
              (_group) => _group.id === group.id
            );

            const msg = messageData;
            filteredGroupChat.latest_message = msg.message;
            filteredGroupChat.messages.push(msg.message);
            const otherGroups = groups.filter(
              (_group) => _group.id !== group.id
            );

            otherGroups.push(filteredGroupChat);
            console.log(otherGroups);

            setGroups(otherGroups);
          }
        }
      };
    }
  }, [socket]);

  return (
    <Box
      className={classes.groupItem}
      onClick={onClick}
      bgcolor={groupId === group.id ? "#3286e7" : "#ccc"}
    >
      <img className={classes.groupIcon} src={group?.image} />
      <Box className={classes.groupInfo}>
        <span
          className={classes.groupName}
          style={{
            textOverflow: "ellipsis",
            maxWidth: "80%",
          }}
        >
          {group?.chat_name}
        </span>
        <Typography
          variant="caption"
          className={classes.groupLatestMessage}
          noWrap
          maxWidth={"95%"}
          textOverflow={"ellipsis"}
        >
          {group?.latest_message?.message.created_at ? (
            <LatestMessage
              message={group?.latest_message}
              style={{
                color: groupId === group.id ? "#fff" : "#597ee3",
              }}
            />
          ) : (
            <>
              {" "}
              <span
                style={{
                  lineHeight: "20px",
                  color: "#e3d9d9",
                  fontStyle: "italic",
                }}
              >
                Select chat and start discussing
              </span>
            </>
          )}
        </Typography>
      </Box>
      <Box className={classes.groupDateInfo}>
        <span
          style={{
            color: groupId === group.id ? "#fff" : "#597ee3",
          }}
        >
          {group?.latest_message?.message.created_at && displayDate}
        </span>
      </Box>
    </Box>
  );
};

export default React.memo(Group);
