import PaginationComponent from "@/components/Pagination/PaginationComponent";
import TypographyComponent from "@/components/TypographyComponent/TypographyComponent";
import { Post } from "@/types/Post";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Blog.module.scss";
import TagIcon from "@mui/icons-material/Tag";
import PostItem from "./PostItem";
import PostItemSkeleton from "./PostItemSkeleton";
import { LIMIT_DEFAULt, PAGE_DEFAULT } from "@/utils/Constant";
import Empty from "@/components/Empty/Empty";

interface ListBlogProps {
  posts: Post[];
  totalRecord: number;
  loading: Boolean;
  onClickPagination: Function;
}

const cx = classNames.bind(styles);
function ListBlog(props: ListBlogProps) {
  const { posts, totalRecord, loading, onClickPagination } = props;
  const [page, setPage] = useState<number>(PAGE_DEFAULT);
  const [limit, setLimit] = useState<number>(LIMIT_DEFAULt);

  useEffect(() => {
    onClickPagination(page, limit);
  }, [page, limit]);

  const navigate = useNavigate();
  return (
    <Grid>
      <Grid container spacing={5} sx={{ marginY: 4 }}>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <PostItemSkeleton />
            </Grid>
          ))
        ) : posts.length > 0 ? (
          posts.map((post: Post) => (
            <Grid item xs={12} sm={4} md={4} key={post.id}>
              <PostItem post={post} />
            </Grid>
          ))
        ) : (
          <Empty />
        )}
      </Grid>
      <Divider></Divider>
      <PaginationComponent
        setPage={setPage}
        setLimit={setLimit}
        totalRecord={totalRecord}
        limit={limit}
      />
    </Grid>
  );
}

export default ListBlog;
