import { Post } from "@/types/Post";
import { Avatar, Box, CircularProgress, ListItemText } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MainFeaturedPost from "./MainFeaturedPost";

interface MainProps {
  post: Post;
  loading: boolean;
}

export default function Main(props: MainProps) {
  const { post, loading } = props;
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
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
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
        </>
      )}
    </Grid>
  );
}
