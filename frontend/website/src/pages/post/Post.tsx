import { Grid } from "@mui/material";
import PostSection from "Components/Post/global/PostSection/PostSection";
import PostSidebar from "Components/Post/global/PostSidebar/PostSidebar";
import PostTopbar from "Components/Post/global/PostTopbar/PostTopbar";
import React from "react";

type Props = {};

const Post = (props: Props) => {
  return (
    <Grid
      container
      direction={"column"}
      display={"flex"}
      sx={{ height: "100vh", width: "100%", position: "relative" }}
    >
      <Grid item sx={{ position: "sticky", top: 0, zIndex: 99 }}>
        <PostTopbar />
      </Grid>
      <Grid item>
        <Grid container height={"100%"} width={"100%"} position={"absolute"}>
          <Grid item md={3} height={"100%"} position={"relative"}>
            <PostSidebar />
          </Grid>
          <Grid item md={6} sm={8} xs={9} sx={{ overflowY: "auto" }}>
            <PostSection />
          </Grid>
          <Grid item md={3} sm={0} xs={0} sx={{ p: 0, m: 0 }}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Post;
