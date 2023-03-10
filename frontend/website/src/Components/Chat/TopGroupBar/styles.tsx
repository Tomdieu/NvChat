import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  topbar: {
    backgroundColor: "#1d5387",
    position: "sticky",
    top: 0,
  },
  topbarWrapper: {
    padding: theme.spacing(1.2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > *": {
      color: "#fff",
    },
  },
  topbarImg: {
    cursor: "pointer",
  },
  topbarCenter: {
    flex: 1,
    paddingLeft: theme.spacing(1),
    cursor: "pointer",
  },
  topbarIcons: {
    display: "flex",
    gap: theme.spacing(2),
  },
  topbarIcon: {
    cursor: "pointer",
    "& > *": {
      color: "#fff",
    },
  },
}));
