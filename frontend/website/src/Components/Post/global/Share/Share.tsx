import { Avatar, Box, Button, Divider, InputBase, Paper } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";
import {
  EmojiEmotions,
  IosShare,
  LocationOn,
  PhotoCamera,
  SendSharp,
  ShareLocation,
  Tag,
} from "@mui/icons-material";

type Props = {};

const Share = (props: Props) => {
  const classes = useStyles();
  return (
    <Box component={Paper} className={classes.shareContainer}>
      <Box className={classes.inputContainer}>
        <Avatar />
        <Box sx={{ width: "100%" }}>
          <InputBase
            fullWidth
            placeholder="Share with other's what is in your mine ?"
            multiline
            maxRows={5}
            sx={(theme) => ({
              p: theme.spacing(1),
              scrollbarWidth: "none",
              // border: "1px solid #ccc",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                width: "0px",
              },
              WebkitOverflowScrolling: "unset",
              borderRadius: 1,
              scrollMargin: 0,
              scrollbarGutter: "stable",
              mb: 0.2,
              overflow: "hidden",
            })}
          />
          {/* <hr style={{ borderRadius: 10, color: "#ccc" }} /> */}
          <Divider />
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        p={1}
        alignItems={"flex-start"}
        gap={2}
      >
        <Box display={"flex"} gap={1} flexWrap={"wrap"}>
          <Button
            // className={classes.button}

            sx={(theme) => ({
              borderRadius: 5,

              color: "tomato",
              "&:hover": {},
              [theme.breakpoints.down("sm")]: {
                fontSize: ".7rem",
              },
              //   flex: 1,
            })}
            startIcon={<PhotoCamera />}
          >
            Photo or video
          </Button>
          <Button
            startIcon={<Tag />}
            sx={(theme) => ({
              borderRadius: 5,

              color: "blue",
              "&:hover": {},
              [theme.breakpoints.down("sm")]: {
                fontSize: ".7rem",
              },
              //   flex: 1,
            })}
          >
            Tag
          </Button>
          <Button
            sx={(theme) => ({
              borderRadius: 5,

              color: "green",
              "&:hover": {},
              [theme.breakpoints.down("sm")]: {
                fontSize: ".7rem",
              },
              //   flex: 1,
            })}
            startIcon={<ShareLocation />}
          >
            Location
          </Button>
          <Button
            startIcon={<EmojiEmotions />}
            sx={(theme) => ({
              borderRadius: 5,

              color: "gold",
              "&:hover": {},
              [theme.breakpoints.down("sm")]: {
                fontSize: ".7rem",
              },
              //   flex: 1,
            })}
          >
            Feelings
          </Button>
        </Box>
        <Button
          // endIcon={<SendSharp sx={{ transform: "rotate(-45deg)" }} />}
          sx={(theme) => ({
            borderRadius: 5,
            backgroundColor: "#0a710a",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#0a710a",
            },
            [theme.breakpoints.down("sm")]: {
              fontSize: ".7rem",
            },
            //   flex: 1,
          })}
        >
          Share
        </Button>
      </Box>
    </Box>
  );
};

export default Share;
