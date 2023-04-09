import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    backgroundColor: "#4a87e8",
    marginTop: 0,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  listItem: {
    display: "flex",
    gap: theme.spacing(1),
    padding: theme.spacing(2),
    alignItems: "center",
    cursor: "pointer",

    // backgroundColor: "rgba(255,255,255,.3)",
    "&:hover": {
      opacity: 0.5,
      backgroundColor: "rgba(255,255,255,.5)",
    },

    "& > *": {
      color: "#fff",
      fontFamily: "Fira Code",
    },
    "& ::selection": {
      backgroundColor: "transparent",
    },
    "&:active": {
      transform: "scale(1.01)",
    },
  },
  name: {
    //   color: "#fff",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));
