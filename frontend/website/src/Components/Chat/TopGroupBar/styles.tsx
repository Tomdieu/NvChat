import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  topbar: {
    backgroundColor: "#1d5387",
    // height: "7vh",
    flex: 1,
    display: "flex",
    width: "100%",
  },
  topbarWrapper: {
    padding: theme.spacing(1),
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    "& > *": {
      color: "#fff",
    },
  },
  topbarImg: {
    cursor: "pointer",
    lineHeight: 32,
  },
  topbarCenter: {
    flex: 1,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginRight: theme.spacing(1),
    cursor: "pointer",
    overflow: "hidden",
  },
  topbarIcons: {
    display: "flex",
    gap: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  topbarIcon: {
    cursor: "pointer",
    "& > *": {
      color: "#fff",
    },
  },
}));
