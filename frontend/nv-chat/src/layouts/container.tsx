import { Close, Search } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import ChatSelect from "components/ChatSelect";
import ListDiscussion from "components/Discussion/ListDiscussion";
import ListGroups from "components/Discussion/ListGroups";
import TabPanel from "components/TabPanel";
import { useChatContext } from "context/ChatContext";
import React, { useEffect } from "react";
import { useStyles } from "./styles";

import { Helmet } from "react-helmet";
import TopChatBar from "components/TopChatBar";

import Topbar from "components/Discussion/Topbar";
import InputMessageContainer from "components/Discussion/InputMessageContainer";
import MessageContainer from "components/Discussion/MessageContainer";

type Props = {
  children:React.ReactNode
};

const container = (props: Props) => {
  const classes = useStyles();
  const {children} = props;
  const {
    selectedButton,
    isRightOpen,
    getGroups,
    getDiscussions,
    discussionsList,
    setDiscussionsList,
    groupsList,
    toggleRight,
    setGroupsList,
    selectedChatType,
    selectedGroup,
    selectedDiscussion,
  } = useChatContext();

  // console.log("Chat Type : ", { selectedChatType });
  // console.log("Group Selected : ", { selectedGroup });
  // console.log("Discussion Selected : ", { selectedDiscussion });

  // useEffect(() => {
  //   if (selectedButton === "chat") {
  //     getDiscussions();
  //   }
  //   if (selectedButton === "group") {
  //     getGroups();
  //   }
  // }, [selectedButton]);

  useEffect(()=>{
    getDiscussions()
    getGroups();

  },[selectedButton])

  console.log(selectedButton);
  return (
    <Grid
      container
      className={classes.container}
      width={"100vw"}
      height={"100vh"}
    >
      <Helmet>
        <title>Nv Chat</title>
      </Helmet>
      <Grid item md={3} sm={3} xs={12} className={classes.leftContainer}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* top */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 1.5,
              bgcolor: "tomato",
            }}
          >
            <Typography className={classes.header} variant={"h4"}>
              Nv Chat
            </Typography>
            <IconButton
              centerRipple={false}
              onClick={toggleRight}
              sx={{
                bgcolor: "white",
                borderRadius: "0.5rem",
                width: "2.5rem",
                height: "2.5rem",
                ":active": {
                  bgcolor: "white",
                  transform: "scale(0.9)",
                },
                ":hover": {
                  bgcolor: "white",
                },
              }}
            >
              <Search className={classes.searchIconButton} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              bgcolor: "#ccc",
            }}
          >
            <ChatSelect />
            <Box
              sx={{
                flex: 1,
                position: "relative",
                overflow: "none",
                overflowY: "auto",
              }}
            >
              <TabPanel
                label={"chat"}
                value={selectedButton}
                style={{ padding: 3 }}
              >
                {/* <Typography>Discussion</Typography> */}
                <ListDiscussion conversations={discussionsList} />
              </TabPanel>
              <TabPanel
                label={"group"}
                value={selectedButton}
                style={{ padding: 3 }}
              >
                {/* <Typography>Group</Typography> */}
                <ListGroups groups={groupsList} />
              </TabPanel>
              <TabPanel
                label={"post"}
                value={selectedButton}
                style={{ padding: 3 }}
              >
                <Typography>Post</Typography>
              </TabPanel>
              <TabPanel
                label={"friends"}
                value={selectedButton}
                style={{ padding: 3 }}
              >
                <Typography>Friends</Typography>
              </TabPanel>
              <TabPanel
                label={"settings"}
                value={selectedButton}
                style={{ padding: 3 }}
              >
                <Typography>Settings</Typography>
              </TabPanel>
              <TabPanel
                label={"notifications"}
                value={selectedButton}
                style={{ padding: 3 }}
              >
                <Typography>Notifications</Typography>
              </TabPanel>
            </Box>
          </Box>
        </Box>
        {/* bottom */}
      </Grid>
      <Grid
        item
        md={isRightOpen ? 6 : 9}
        sm={isRightOpen ? 6 : 9}
        xs={12}
        className={classes.middleContainer}
      >
        {children}
      </Grid>
      {isRightOpen && (
        <Grid
          item
          md={isRightOpen ? 3 : 0}
          sm={isRightOpen ? 3 : 0}
          xs={12}
          className={classes.rightContainer}
        >
          {/* <Typography>Right</Typography> */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <IconButton
              onClick={toggleRight}
              centerRipple={false}
              sx={{
                // bgcolor: "white",
                // borderRadius: "0.5rem",
                width: "2.5rem",
                height: "2.5rem",
                position: "absolute",
                top: 2,
                right: 2,
              }}
            >
              <Close color="success" className={classes.searchIconButton} />
            </IconButton>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default container;
