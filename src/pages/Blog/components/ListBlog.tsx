import Empty from "@/components/Empty/Empty";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { Post } from "@/types/Post";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/Constant";
import { Divider, Grid } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Blog.module.scss";
import PostItem from "./PostItem";
import PostItemSkeleton from "./PostItemSkeleton";

interface ListBlogProps {
  posts: Post[];
  totalRecord: number;
  loading: boolean;
  onClickPagination: Function;
  isPagination?: boolean;
}

const cx = classNames.bind(styles);
function ListBlog(props: ListBlogProps) {
  const {
    posts,
    totalRecord,
    loading,
    onClickPagination,
    isPagination = true,
  } = props;
  const [page, setPage] = useState<number>(PAGE_DEFAULT);
  const [limit, setLimit] = useState<number>(LIMIT_DEFAULT);

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
      {isPagination && (
        <>
          <Divider></Divider>
          <PaginationComponent
            setPage={setPage}
            setLimit={setLimit}
            totalRecord={totalRecord}
            limit={limit}
          />
        </>
      )}
    </Grid>
  );
}

export default ListBlog;
