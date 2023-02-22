import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  topbarContainer: {
    height: "75px",
    width: "100vw",
    backgroundColor: "#256",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: 0,
    gap: theme.spacing(2),
  },
  topbarLeft: {
    flex: 3,
  },
  logo: {
    cursor: "pointer",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
    marginLeft:'24px'
  },
  topbarCenter: {
    flex: 5,
    backgroundColor: "#ddd",
    borderRadius: theme.shape.borderRadius,
  },
  searchbar: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
  },
  searchInput: {},
  topbarRight: {
    flex: 4,
    // backgroundColor:'#0f0'
  },
  topbarLinks: {
    display: "flex",
  },
  topbarIcons: {
    display: "flex",
  },
}));
