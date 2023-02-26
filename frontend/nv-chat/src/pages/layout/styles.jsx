import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#929693c9",
  },
  leftContainer: {
    // backgroundColor: "rgb(134, 202, 184)",
    maxHeight:'100vh',
    overflow:'none',
    overflowY:'auto',
    backgroundColor: '#458',
  
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing(2),
    cursor: "pointer",
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: "4em",
    color: "#fff",
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
  },
  searchBox: {
    backgroundColor: "#ccc",
    display:'flex',
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    borderRadius:theme.shape.borderRadius
  },
  searchInput:{
    fontSize:'2em',
    fontWeight: 'bold',
    // backgroundColor:'#ccc',
    color:'#fff',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius
  },
  headerTabContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#d6dbd999",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  rightContainer: {
    backgroundColor: "#d0d2d1db",
  },
//   ###############################
  tabs: {
    backgroundColor: '#f1f1f1',
    // borderRadius: theme.shape.borderRadius,
    boxShadow: 'none',
  },
  tab: {
    fontWeight: 600,
    fontSize: 16,
    minWidth: 10,
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    color: '#666',
    '&:hover': {
      color: '#333',
    },
    '&.Mui-selected': {
      color: '#333',
    },
  },
}));
