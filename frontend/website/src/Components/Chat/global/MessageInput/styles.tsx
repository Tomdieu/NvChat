import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  messageInput: {
    backgroundColor: "#c5bfbf",
    flex: 1,
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
  },
  messageInputWrapper: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: theme.spacing(1),
    width: "100%",
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    backgroundColor: "#ddd",
    borderRadius: theme.shape.borderRadius,
    borderBottom: "2px solid #38f0b0",
    "&:focus-within": {
      borderBottom: "2px solid #227aec",
    },
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
