import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  rightbar: {
    height: "100vh",
    backgroundColor: "#e1dbdb",
  },
  rightbarWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  rightbarTop: {
    backgroundColor: "#ede9e9b5",
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
    paddingLeft: 20,
    minHeight: "78px",
    gap: theme.spacing(2),
  },
  rightbarBottom: {
    overflow: "auto",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid #ccc",
  },
  title: {
    fontWeight: "normal",
    fontSize: "30px",
    display: "block",
    textAlign: "center",
    width: "100%",
  },
}));
