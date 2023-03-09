import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // width: "100vw",
    padding: theme.spacing(1),
    gap: theme.spacing(4),
    backgroundColor: "#568",
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 999,
    // height: "64px",
    "& > *": {
      color: "#fff",
    },
  },
  leftContainer: {
    flex: 3,
  },
  centerContainer: {
    flex: 5,
  },
  rightContainer: {
    flex: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  searchWrapper: {
    display: "flex",

    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 5,
    paddingLeft: theme.spacing(1),
  },
  searchInput: {
    padding: theme.spacing(1),
    width: "500px",
    color: "#ccc",
  },
  iconList: {
    display: "flex",
    marginRight: theme.spacing(3),
    // justifyContent: "space-between",
  },
  icon: {
    color: "#fff",
  },
  iconButton: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    right: 0,
    top: 5,
    fontSize: ".5em",
    color: "#fff",
    background: "#f00",
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    cursor: "pointer",
    width: "32px",
    height: "32px",
    objectFit: "cover",
    marginRight: theme.spacing(1.8),
  },
}));
