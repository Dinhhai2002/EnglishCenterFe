import TypographyComponent from "@/components/TypographyComponent/TypographyComponent";
import { Post } from "@/types/Post";
import TagIcon from "@mui/icons-material/Tag";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
} from "@mui/material";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "../Blog.module.scss";

interface PostItemProps {
  post: Post;
}

const cx = classNames.bind(styles);

function PostItem(props: PostItemProps) {
  const { post } = props;
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/blog/${post.id}`);
      }}
      className={cx("item")}
      sx={{ maxWidth: 345 }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={post.banner}
      />

      <Chip
        sx={{ margin: 3 }}
        variant="outlined"
        color="primary"
        icon={<TagIcon />}
        label={post.category_blog_name}
      />
      <CardContent sx={{ height: "93px" }}>
        <TypographyComponent numberLine={2} content={post.title} />
      </CardContent>
      <CardHeader
        avatar={<Avatar src={post.author_avatar} aria-label="author"></Avatar>}
        title={post.author_name}
        subheader={post.created_at}
      />
    </Card>
  );
}

export default PostItem;
