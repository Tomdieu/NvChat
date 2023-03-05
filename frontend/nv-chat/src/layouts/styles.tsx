import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#656c7bd6",
    position: "relative",
    overflowX: "hidden",
    overflowY: "auto",
    // backgroundColor: "#2596be",
  },
  leftContainer: {
    // backgroundColor: "#1e5ad2",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    "& >*": {
      color: "#fff",
    },
  },
  middleContainer: {},
  rightContainer: {
    backgroundColor: "azure",
    transition: "all 1s",
  },
  leftTopContainer: {
    display: "flex",
    // alignItems: "center",
    // justifyContent: "space-between",
    // padding: theme.spacing(2),
  },
  header: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 30,
    cursor: "pointer",
  },
  btnContainer: {
    bgcolor: "white",
    borderRadius: "0.5rem",
    width: "2.5rem",
    height: "2.5rem",
  },
  searchIconButton: {},
}));
