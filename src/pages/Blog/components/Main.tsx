import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Markdown from "./Markdown";
import { Avatar, Box, ListItemText } from "@mui/material";
import { Post } from "@/types/Post";
import MainFeaturedPost from "./MainFeaturedPost";

interface MainProps {
  post: Post;
}

export default function Main(props: MainProps) {
  const { post } = props;
  const mainFeaturedPost = {
    title: `${post.title}`,
    description: `${post.description}`,
    image: `${post.banner}`,
    imageText: "main image description",
    linkText: "",
  };
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography sx={{ color: "black" }} variant="h6" gutterBottom>
        <strong> {post.title}</strong>
      </Typography>
      <Box sx={{ marginY: 2, display: "flex", alignItems: "center" }}>
        <Avatar src={post.author_avatar}></Avatar>
        <Typography sx={{ marginLeft: 2 }} variant="subtitle2" gutterBottom>
          {post.author_name} | {post.created_at}
        </Typography>
      </Box>
      <Divider />
      <MainFeaturedPost post={mainFeaturedPost} />
      <ListItemText
        sx={{ wordWrap: "break-word" }}
        primary={<div dangerouslySetInnerHTML={{ __html: post.content }} />}
      />
    </Grid>
  );
}
