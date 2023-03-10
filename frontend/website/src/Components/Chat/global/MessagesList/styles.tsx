import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  messageList: {
    display: "flex",
    flex: 1,
    backgroundColor: "red",
    overflowY: "auto",
    padding: theme.spacing(1),
    flexDirection: "column",
  },
  messageWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    padding: "9px 5px",
  },
}));
