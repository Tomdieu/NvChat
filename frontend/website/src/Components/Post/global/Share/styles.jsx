import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  shareContainer: {
    display: "flex",
    padding: theme.spacing(0.5),
    flexDirection: "column",
    gap: 5,
    marginTop: theme.spacing(1),
    // maxWidth: 600,
  },
  inputContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: theme.spacing(1),
  },
  button: {
    borderRadius: 3,
    backgroundColor: "black",
    color: "#fff",
    "&:hover": {
      backgroundColor: "black",
    },
    [theme.breakpoints.down("md")]: {
      "& > *": {
        fontSize: "1.1rem",
      },
    },
  },
}));
