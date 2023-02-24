import React, { useState } from "react";

import {
  Avatar,
  Box,
  Grid,
  InputBase,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useStyles } from "./styles";

import TopChatBar from "@components/TopChatBar";
import { MessageList } from "@components/Messages";
import { AccountCircle, ChatBubble, Group, Search } from "@mui/icons-material";

import groupData from "@utils/groups";
import disData from "@utils/discussion";
import TabPanel from "@components/TabPanel";

console.log(groupData);

const index = () => {
  const classes = useStyles();
  const [tabBarValue, setTabBarValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabBarValue(newValue);
  };

  // const [discussion,setDiscussion] = useState(disData)
  // const [groups,setGroups] = useState(groupData)
  return (
    <Grid
      container
      className={classes.container}
      width={"100vw"}
      height={"100vh"}
    >
      <Grid item md={3} className={classes.leftContainer}>
        <Box sx={(theme) => ({ padding: theme.spacing(1) })}>
          <Box className={classes.headerContainer}>
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(1),
              })}
            >
              {/* <img width={30} height={30} src={LogoImg} /> */}
              <Typography variant="h3" className={classes.title}>
                NvChat
              </Typography>
            </Box>
          </Box>
          <Box className={classes.searchBox} component={Paper}>
            <Search style={{ color: "#ccc" }} />
            <InputBase
              placeholder="search user"
              className={classes.searchInput}
              fullWidth
            />
          </Box>
          <Box component={Paper} elevation={2}>
            <Tabs
              value={tabBarValue}
              // centered
              onChange={handleChange}
              selectionFollowsFocus
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              className={classes.tabs}
              sx={(theme) => ({
                flex: 1,
                // backgroundColor: "red",
                my: theme.spacing(0.4),
                display: "flex",
                justifyContent: "center",
              })}
            >
              <Tab
                // icon={<ChatBubble />}
                iconPosition="start"
                label={"Discussion"}
                className={classes.tab}
              />
              <Tab
                // icon={<Group />}
                iconPosition="start"
                label={"Group"}
                className={classes.tab}
              />
              <Tab
                // icon={<Group />}
                disabled
                iconPosition="start"
                label={"Status"}
                className={classes.tab}
              />
              <Tab
                // icon={<Search />}
                iconPosition="start"
                label={"Search"}
                className={classes.tab}
              />
            </Tabs>
          </Box>
          <Box>
            {/* This part will contain all the discussion list  */}

            {/* Discussion */}

            {/* Group */}

            <TabPanel value={tabBarValue} index={1}>
              {groupData?.map((group, index) => (
                <Box
                  key={index}
                  component={Paper}
                  sx={(theme) => ({
                    display: "flex",
                    padding: theme.spacing(1),
                    justifyContent:'space-between',
                    cursor:'pointer'
                  })}
                >
                <Box sx={(theme) => ({
                    display: "flex",
                    padding: theme.spacing(1),
                    justifyContent:'space-between',
                    mx:theme.spacing(.5)
                  })}>
                  <Box>
                    <Avatar />
                  </Box>
                  <Box>
                    <Typography>{group.chat_name}</Typography>
                    <Typography></Typography>
                  </Box>
                  </Box>
                  <Box>
                    <Typography>19:55</Typography>
                  </Box>
                </Box>
              ))}
            </TabPanel>

            {/* Search Results */}
          </Box>
        </Box>
      </Grid>
      <Grid item md={6} sm={0} className={classes.middleContainer}>
        <TopChatBar
          name="ivantom"
          type={"group"}
          msgIndicator={"ivantom is typing"}
        />
        <MessageList />
      </Grid>
      <Grid item md={3} sm={0} className={classes.rightContainer}>
        Right
      </Grid>
    </Grid>
  );
};

export default index;
