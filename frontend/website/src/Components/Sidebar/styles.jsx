import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  sidebarContainer: {
    position: "sticky",
    top: "64px",
    marginTop: "64px",
    // backgroundColor: "#2358af",
    height: "100% ",
    border: "1px solid #ddd",
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
    padding: theme.spacing(1),
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
