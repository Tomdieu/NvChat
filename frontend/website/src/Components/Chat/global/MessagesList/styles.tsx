import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  messageList: {
    display: "flex",
    flex: 10,
    backgroundColor: "#1570e0c9",
    overflowY: "auto",
    padding: theme.spacing(1.5),
    flexDirection: "column",
    // maxHeight: "92vh",
    overflow: "hidden",
  },
  messageWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    padding: "9px 5px",

    // padding: theme.spacing(2),
  },
}));
