import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  sidebar: {
    height: "100vh",
    backgroundColor: "#1d5387",
    padding: 0,
    margin: 0,
    position: "sticky",
    top: 0,
  },
  sidebarWrapper: {
    // padding: theme.spacing(1),
    height: "100vh",
    margin: 0,
  },
  sidebarTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: theme.spacing(1),
    height: "8vh",
    paddingLeft: theme.spacing(1),
    margin: 0,
    "& > *": {
      color: "#fff",
    },
  },
  sidebarTitle: {
    fontWeight: "bold",
    cursor: "pointer",
  },
  sidebarBottom: {
    height: "92vh",
    overflowY: "auto",
    margin: 0,
  },
  groupList: {
    "&::-webkit-scrollbar": {
      width: "10px",
      height: "40px",
      borderRadius: "4px",
      cursor: "pointer",
      backgroundColor: "green",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#d6dee1",
      borderRadius: "20px",
      border: "6px solid transparent",
      backgroundClip: "content-box",
      cursor: "pointer",
    },
  },
  groupItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1),
    backgroundColor: "#ccc",
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
    marginBottom: theme.spacing(0.8),
    marginLeft: theme.spacing(1),
    "&:hover": {
      opacity: 0.8,
    },
  },
  groupIcon: {},
  groupInfo: {
    flex: 1,
    // backgroundColor: "red",
    paddingLeft: theme.spacing(1),
  },
  groupName: {
    fontWeight: "bold",
    fontSize: "18px",
  },
}));
