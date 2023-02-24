import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#27ce51c9",
    padding: theme.spacing(1),
    borderRadius:theme.shape.borderRadius,
    cursor:'pointer'
  },
  title: {
    marginLeft: theme.spacing(2),
    color:'#fff',
    fontWeight:'bold'
  },
  center: { flex: 1, paddingLeft:theme.spacing(2) },
  msg:{
    fontStyle:'italic',
    color:'#fff',
    fontSize:'10px'
  }
}));
