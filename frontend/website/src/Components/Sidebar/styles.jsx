import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    flex: 3,
    position: "sticky",
    marginTop: "64px",
    bottom: 0,
    left: 0,
    height: "100vh",
    overflowY: "auto",
    backgroundColor: "red",
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
    [theme.breakpoints.down("ms")]: {
      padding: theme.spacing(0.1),
    },
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
    "&:active": {
      backgroundColor: "#5376f0",
      color: "#fff",
    },
    "& ::selection": {
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("md")]: {
      width: "fit-content",
      justifyContent: "center",
    },
  },
  sidebarIcon: {
    marginRight: theme.spacing(1.5),
    [theme.breakpoints.down("md")]: {
      marginRight: theme.spacing(0),
    },
  },
  sidebarListItemText: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
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
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  sidebarbtnFriendShowMore: {
    [theme.breakpoints.down("md")]: {
      display: "none",
      backgroundColor: "black",
    },
  },
}));
