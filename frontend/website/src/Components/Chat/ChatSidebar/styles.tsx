import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  sidebar: {
    height: "100vh",
    display: "flex",
  },
  sidebarWrapper: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1d5387",
    flex: 1,
    padding: theme.spacing(1),
  },
  sidebarTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: "2.3rem",
    fontWeight: "normal",
    color: "#fff",
  },
  iconBtn: {
    "& > *": {
      color: "#fff",
    },
  },
  sidebarBottom: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f4f8fa",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    flex: 1,
    maxHeight: "4%",
  },
  icon: {
    backgroundColor: "#f4f8fa",
  },
  searchInput: {
    // backgroundColor: "##ffffffb8",
    borderRadius: theme.shape.borderRadius,
    fontSize: 20,
    lineHeight: 32,
    "& :focus": {
      borderRadius: theme.shape.borderRadius,
    },
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    backgroundColor: "green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: theme.spacing(1.2),
    right: theme.spacing(1.2),
    "& > * > *": {
      color: "#fff",
    },
  },
  discussionList: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.5),
    paddingTop: theme.spacing(1),
  },
  discussion: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ccc",
    padding: theme.spacing(0.8),
    borderRadius: theme.shape.borderRadius,
    gap: theme.spacing(0.5),
    cursor: "pointer",

    "&:active": {
      backgroundColor: "#7cc0f8",
    },

    "& ::selection": {
      backgroundColor: "transparent",
    },
  },
  discImg: {
    // backgroundColor: "red",
  },
  online: {
    position: "absolute",
    width: 12,
    height: 12,
    backgroundColor: "#28c328",
    borderRadius: "50%",
    right: 1,
    bottom: 0,
  },
  discussionName: {
    fontSize: "1.2em",
    fontWeigth: "bold",
  },
  discussionNameSelected: {
    fontSize: "1.2em",
    fontWeigth: "bold",
    color: "#fff",
  },
  discLatestMsg: {
    color: "grey",
    fontStyle: "italic",
  },
  discLatestMsgSelected: {
    color: "#e0dcdc",
    fontStyle: "italic",
  },
}));
