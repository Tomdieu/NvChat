import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  messageInput: {
    backgroundColor: "#c5bfbf",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  messageInputWrapper: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    backgroundColor: "#ddd",
    borderRadius: theme.shape.borderRadius,
  },
  iconContainer: {
    marginLeft: theme.spacing(2),
  },
  iconButton: {},
  icon: {
    width: "32px",
    height: "32px",
  },
}));
