import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";
import { Settings } from "@mui/icons-material";

type Props = {};

const GroupSidebar = (props: Props) => {
  const classes = useStyles();
  return (
    <Grid item md={3} sm={4} className={classes.sidebar}>
      <Box className={classes.sidebarWrapper}>
        <Box className={classes.sidebarTop}>
          <Typography variant={"h4"} className={classes.sidebarTitle}>
            Nv Chat
          </Typography>
          <IconButton>
            <Settings />
          </IconButton>
        </Box>
        <Box className={classes.sidebarBottom}>
          {/* <Typography variant="h6">Discussions</Typography> */}
          <Box></Box>
          <Box className={classes.groupList}>
            <Box className={classes.groupItem}>
              <Avatar className={classes.groupIcon} />
              <Box className={classes.groupInfo}>
                <Typography variant="h6" className={classes.groupName}>
                  Ivan Tom
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.groupLatestMessage}
                >
                  Latest Message
                </Typography>
              </Box>
              <Box className={classes.groupDateInfo}>19:10</Box>
            </Box>
            <Box className={classes.groupItem}>
              <Avatar className={classes.groupIcon} />
              <Box className={classes.groupInfo}>
                <Typography variant="h6" className={classes.groupName}>
                  Ivan Tom
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.groupLatestMessage}
                >
                  Latest Message
                </Typography>
              </Box>
              <Box className={classes.groupDateInfo}>19:10</Box>
            </Box>
            <Box className={classes.groupItem}>
              <Avatar className={classes.groupIcon} />
              <Box className={classes.groupInfo}>
                <Typography variant="h6" className={classes.groupName}>
                  Ivan Tom
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.groupLatestMessage}
                >
                  Latest Message
                </Typography>
              </Box>
              <Box className={classes.groupDateInfo}>19:10</Box>
            </Box>
            <Box className={classes.groupItem}>
              <Avatar className={classes.groupIcon} />
              <Box className={classes.groupInfo}>
                <Typography variant="h6" className={classes.groupName}>
                  Ivan Tom
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.groupLatestMessage}
                >
                  Latest Message
                </Typography>
              </Box>
              <Box className={classes.groupDateInfo}>19:10</Box>
            </Box>

            <Box className={classes.groupItem}>
              <Avatar className={classes.groupIcon} />
              <Box className={classes.groupInfo}>
                <Typography variant="h6" className={classes.groupName}>
                  Ivan Tom
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.groupLatestMessage}
                >
                  Latest Message
                </Typography>
              </Box>
              <Box className={classes.groupDateInfo}>19:10</Box>
            </Box>
            <Box className={classes.groupItem}>
              <Avatar className={classes.groupIcon} />
              <Box className={classes.groupInfo}>
                <Typography variant="h6" className={classes.groupName}>
                  Ivan Tom
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.groupLatestMessage}
                >
                  Latest Message
                </Typography>
              </Box>
              <Box className={classes.groupDateInfo}>19:10</Box>
            </Box>
            <Box className={classes.groupItem}>
              <Avatar className={classes.groupIcon} />
              <Box className={classes.groupInfo}>
                <Typography variant="h6" className={classes.groupName}>
                  Ivan Tom
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.groupLatestMessage}
                >
                  Latest Message
                </Typography>
              </Box>
              <Box className={classes.groupDateInfo}>19:10</Box>
            </Box>
            <Box className={classes.groupItem}>
              <Avatar className={classes.groupIcon} />
              <Box className={classes.groupInfo}>
                <Typography variant="h6" className={classes.groupName}>
                  Ivan Tom
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.groupLatestMessage}
                >
                  Latest Message
                </Typography>
              </Box>
              <Box className={classes.groupDateInfo}>19:10</Box>
            </Box>
            <Box className={classes.groupItem}>
              <Avatar className={classes.groupIcon} />
              <Box className={classes.groupInfo}>
                <Typography variant="h6" className={classes.groupName}>
                  Ivan Tom
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.groupLatestMessage}
                >
                  Latest Message
                </Typography>
              </Box>
              <Box className={classes.groupDateInfo}>19:10</Box>
            </Box>
            <Box className={classes.groupItem}>
              <Avatar className={classes.groupIcon} />
              <Box className={classes.groupInfo}>
                <Typography variant="h6" className={classes.groupName}>
                  Ivan Tom
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.groupLatestMessage}
                >
                  Latest Message
                </Typography>
              </Box>
              <Box className={classes.groupDateInfo}>19:10</Box>
            </Box>
            <Box className={classes.groupItem}>
              <Avatar className={classes.groupIcon} />
              <Box className={classes.groupInfo}>
                <Typography variant="h6" className={classes.groupName}>
                  Ivan Tom
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.groupLatestMessage}
                >
                  Latest Message
                </Typography>
              </Box>
              <Box className={classes.groupDateInfo}>19:10</Box>
            </Box>
            <Box className={classes.groupItem}>
              <Avatar className={classes.groupIcon} />
              <Box className={classes.groupInfo}>
                <Typography variant="h6" className={classes.groupName}>
                  Ivan Tom
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.groupLatestMessage}
                >
                  Latest Message
                </Typography>
              </Box>
              <Box className={classes.groupDateInfo}>19:10</Box>
            </Box>
            <Box className={classes.groupItem}>
              <Avatar className={classes.groupIcon} />
              <Box className={classes.groupInfo}>
                <Typography variant="h6" className={classes.groupName}>
                  Ivan Tom
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.groupLatestMessage}
                >
                  Latest Message
                </Typography>
              </Box>
              <Box className={classes.groupDateInfo}>19:10</Box>
            </Box>
            <Box className={classes.groupItem}>
              <Avatar className={classes.groupIcon} />
              <Box className={classes.groupInfo}>
                <Typography variant="h6" className={classes.groupName}>
                  Ivan Tom
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.groupLatestMessage}
                >
                  Latest Message
                </Typography>
              </Box>
              <Box className={classes.groupDateInfo}>19:10</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default GroupSidebar;
