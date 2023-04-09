import { Notifications, SearchRounded } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";

type Props = {};

const PostTopbar = (props: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.topbar}>
      <Link to={"/"} className={classes.leftbar}>
        <Typography
          variant={"h4"}
          component={"span"}
          className={classes.appName}
        >
          Nv Social
        </Typography>
        <Typography
          variant={"h4"}
          component={"span"}
          className={classes.appName1}
        >
          NS
        </Typography>
      </Link>
      <Box className={classes.inputBox}>
        <SearchRounded className={classes.icon} />
        <InputBase
          className={classes.input}
          placeholder="Search friends, videos"
          fullWidth
        />
      </Box>
      <Box className={classes.rightContainer}>
        <IconButton>
          <Notifications className={classes.icon} />
        </IconButton>
        {/* <Avatar /> */}
        {/* <img /> */}
      </Box>
    </Box>
  );
};

export default PostTopbar;
