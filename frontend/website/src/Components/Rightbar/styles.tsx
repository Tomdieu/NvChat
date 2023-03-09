import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  rightBarContainer: {
    flex: 3.5,
    paddingTop: theme.spacing(2),
    top: "64px",
    position: "relative",
  },
  rightbarWrapper: {
    padding: theme.spacing(1),
  },
  birthdayContainer: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.5),
  },
  birthdayText: {
    fontWeight: "500",
    fontSize: "15px",
  },
  rightbarTitle: {
    marginBottom: theme.spacing(2),
  },
  rightbarFriendList: {
    padding: 0,
    margin: 0,
    listStyle: "none",
  },
  rightbarFriend: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    cursor: "pointer",
  },
  rightbarProfileImgContainer: {
    marginRight: theme.spacing(1),
    position: "relative",
  },
  rightbarProfileImg: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
  },
  rightbarOnline: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "green",
    position: "absolute",
    top: "-2px",
    right: 0,
    border: "2px solid #fff",
  },
  rightbarUsername: {
    fontWeight: "bolder",
  },
}));
