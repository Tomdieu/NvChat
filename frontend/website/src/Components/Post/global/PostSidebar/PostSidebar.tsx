import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";
import {
  FeaturedVideo,
  Feed,
  Group,
  MessageOutlined,
  PeopleOutline,
} from "@mui/icons-material";

type Props = {};

type linkType = {
  name: string;
  icon?: React.ReactNode;
  url?: string;
};

const links: linkType[] = [
  {
    name: "Post",
    icon: <Feed />,
  },
  {
    name: "Chats",
    icon: <MessageOutlined />,
  },
  {
    name: "Groups",
    icon: <Group />,
  },
  {
    name: "Video",
    icon: <FeaturedVideo />,
  },
  {
    name: "Friends",
    icon: <PeopleOutline />,
  },
];

const PostSidebar = (props: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.list}>
      {links.map(({ icon, name }, index) => (
        <>
          <Box className={classes.listItem}>
            {icon}
            <Typography
              className={classes.name}
              fontFamily={"Fira Code"}
              variant="h6"
            >
              {name}
            </Typography>
          </Box>
          {/* <Divider /> */}
        </>
      ))}
    </Box>
  );
};

export default PostSidebar;
