import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    padding: theme.spacing(0.5),
    backgroundColor: "#266fed",
    height: "100%",
    // width: "100%",
    maxHeight: "60px",
  },
  leftbar: {
    flex: 3,
  },
  appName: {
    fontWeight: "bold",
    color: "white",
    flex: 3,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  appName1: {
    display: "none",
    fontWeight: "bold",
    color: "white",
    [theme.breakpoints.down("md")]: {
      display: "flex",
    },
  },
  inputBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,.3)",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    flex: 4,
    [theme.breakpoints.down("sm")]: {
      flex: 5,
    },
    [theme.breakpoints.up("sm")]: {
      flex: 6,
    },
  },
  icon: {
    color: "white",
    width: 24,
    height: 24,
    cursor: "pointer",
  },
  input: {
    fontSize: "1em",
    borderBottom: "2px solid rgba(255,255,255,.5)",
    paddingRight: 2,
    color: "white",
    "&:active": {
      borderBottom: "2px solid rgba(38, 124, 237, 0.5)",
    },
    "&:focus-within": {
      borderBottom: "2px solid #7ebeec",
    },
  },
  rightContainer: {
    flex: 4,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flex: 2,
    },
  },
}));
