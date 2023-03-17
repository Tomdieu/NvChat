import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  rightbar: {
    backgroundColor: "#e1dbdb",
    height: "100vh",
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
    justifyContent: "space-between",
    paddingLeft: 20,
    minHeight: "78px",
  },
  rightbarBottom: {
    overflowY: "auto",
  },
  closeBtn: {
    marginLeft: theme.spacing(5),
  },
  title: {
    fontSize: "20px",
    flex: 1,
  },
  rightbarCenter: {
    width: "100%",
    // height: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  groupIcon: {
    width: 300,
    height: 300,
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid #ccc",
  },
  groupName: {
    fontWeight: "normal",
    fontSize: "30px",
    display: "block",
    textAlign: "center",
    width: "100%",
  },
  groupMemberDetail: {
    fontSize: ".8em",
    color: "grey",
    textAlign: "center",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  groupDescriptionContainer: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    borderRadius: 0,
  },
  groupMemberContainer: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    borderRadius: 0,
  },
  groupMemberTopContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 0,
  },
  groupInfoDangerContain: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    borderRadius: 0,
  },
}));
