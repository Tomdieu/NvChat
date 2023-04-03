import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  post: {
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    "-webkit-box-shadow": "0px 1px 16px -8px rgba(0,0,0,0.37)",
    boxShadow: "0px 1px 16px -8px rgba(0,0,0,0.37)",
    margin: "30px 0px",
  },
  postWrapper: {
    padding: theme.spacing(1.5),
  },
  postTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postTopLeft: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  postProfileImg: {
    position: "relative",
    zIndex: 0,
  },
  postUsername: {
    fontSize: "15px",
    fontWeight: "bold",
    margin: `0px ${theme.spacing(1)}px`,
  },
  postDate: {
    fontSize: "12px",
  },
  postTopRight: {},
  postCenter: {
    margin: `${theme.spacing(2)}px 0px`,
  },
  postText: {},
  postImg: {
    marginTop: theme.spacing(2),
    maxHeight: "500px",
    width: "100%",
    objectFit: "contain",
  },
  postBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postBottomLeft: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  likeIcon: {
    width: 24,
    height: 24,
    cursor: "pointer",
    marginRight: theme.spacing(0.5),
  },
  likeCounter: {
    fontSize: "15px",
  },
  postBottomRight: {},
  postCommentText: {
    cursor: "pointer",
    borderBottom: "1px dashed gray",
    fontSize: "15px",
  },
}));
