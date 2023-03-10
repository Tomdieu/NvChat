import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  sidebar: {
    height: "100vh",
    backgroundColor: "#1d6eb9",
  },
  sidebarWrapper: {
    padding: theme.spacing(1),
  },
  sidebarTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  groupItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1),
    backgroundColor: "#ccc",
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
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
