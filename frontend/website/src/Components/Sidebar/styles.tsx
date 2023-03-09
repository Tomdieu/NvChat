import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    flex: 3,
    position: "sticky",
    top: "64px",
    bottom: 0,
    left: 0,
    height: "calc(100vh - 64px)",
    overflowY: "auto",
    "&::-webkit-scroll-bar": {
      width: "5px",
    },
    "&::-webkit-scroll-track": {
      backgroundColor: "#f1f1f1",
    },
    "&::-webkit-scroll-thumb": {
      bakgroundColor: "grey",
    },
  },
  sidebarWrapper: {
    padding: theme.spacing(3),
  },
  sidebarList: {
    padding: 0,
    margin: 0,
    listStyle: "none",
  },
  sidebarListItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),

    padding: theme.spacing(1.5),
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ddd",
      opacity: 0.8,
      borderRadius: theme.shape.borderRadius,
    },
  },
  sidebarIcon: {
    marginRight: theme.spacing(1.5),
  },
  sidebarListItemText: {},
  sidebarFriendList: {
    padding: 0,
    margin: 0,
    listStyle: "none",
  },
  sidebarFriend: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: theme.spacing(2),
  },
  sidebarFriendImg: {
    marginRight: theme.spacing(2),
  },
  sidebarFriendName: {
    fontWeight: "bolder",
  },
}));
