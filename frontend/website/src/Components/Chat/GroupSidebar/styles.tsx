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
    height: "100vh",
    margin: 0,
    display: "flex",
    flexDirection: "column",
  },
  sidebarTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 0.95,
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
    // height: "92vh",
    flex: 11,
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
}));
