import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  share: {
    width: "100%",
    // height: "200px",
    borderRadius: theme.shape.borderRadius,
    "-webkit-box-shadow": "0px 1px 16px -8px rgba(0,0,0,0.37)",
    boxShadow: "0px 1px 16px -8px rgba(0,0,0,0.37)",
  },
  shareWrapper: {
    padding: theme.spacing(3),
  },
  shareTop: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  shareProfileImg: {},
  shareInput: {
    border: "none",
    width: "80%",
    // borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    fontSize: "18px",
    "&:focus": {
      outline: "none",
    },
    borderBottom: "1px solid #ccc",
  },
  shareHr: {
    margin: "20px",
  },
  shareBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  shareOptions: {
    display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
  shareOption: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1.5),
    cursor: "pointer",
    padding: theme.spacing(2),
    borderRadius: 20,
    "&:hover": {
      backgroundColor: "#e9e7e7b0",
    },
    "&:active": {
      opacity: ".7",
    },
    "&::selection": {
      backgroundColor: "transparent",
    },
  },
  shareIcon: {
    marginRight: theme.spacing(1),
  },
  shareOptionText: {
    fontSize: "14px",
    fontWeight: "500",
  },
  shareButton: {
    border: "none",
    padding: theme.spacing(2),
    borderRadius: 20,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#39a742",
    cursor: "pointer",
    "&:active": {
      opacity: ".7",
    },
  },
}));
