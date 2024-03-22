import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import Container from "@mui/material/Container";
// import XIcon from "@mui/icons-material/X";

import categoryBlogApiService from "@/services/API/CategoryBlogApiService";
import postApiService from "@/services/API/PostApiService";
import { Box, Divider, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./Blog.module.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ListBlog from "./components/ListBlog";
import MainFeaturedPost from "./components/MainFeaturedPost";
import { LIMIT_DEFAULt, PAGE_DEFAULT } from "@/utils/Constant";
import { StatusEnum } from "@/utils/enum/StatusEnum";

const cx = classNames.bind(styles);

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random?wallpapers",
  imageText: "main image description",
  linkText: "",
};

export default function Blog() {
  const [categoryBlog, setCategoryBlog] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalRecord, setTotalRecord] = useState(1);
  const [loading, setLoading] = useState<Boolean>(true);

  const fetchPost = (
    categoryBlogId?: number,
    keySearch?: string,
    status?: number,
    page?: number,
    limit?: number
  ) => {
    postApiService
      .getAll(categoryBlogId, keySearch, status, page, limit)
      .then((data: any) => {
        setPosts(data.data.list);
        setTotalRecord(data.data.total_record);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    categoryBlogApiService
      .getAll()
      .then((data: any) => {
        setCategoryBlog(data.data);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
    fetchPost(-1, "", StatusEnum.ON, PAGE_DEFAULT, LIMIT_DEFAULt);
  }, []);

  const handleClickCategoryBlog = (id: number) => {
    setLoading(true);
    fetchPost(id, "", StatusEnum.ON, PAGE_DEFAULT, LIMIT_DEFAULt);
  };

  const onClickPagination = (page: number, limit: number) => {
    setLoading(true);
    fetchPost(-1, "", StatusEnum.ON, page, limit);
  };

  return (
    <Box className={cx("body")}>
      <Container maxWidth="lg">
        <Header
          title="Blog English Center"
          sections={categoryBlog}
          handleClickCategoryBlog={handleClickCategoryBlog}
        />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />

          <Typography variant="h6" sx={{ marginY: 4, color: "black" }}>
            <strong> Danh sách Blog</strong>
          </Typography>
          <Divider></Divider>
          <Container maxWidth="lg">
            <ListBlog
              posts={posts}
              totalRecord={totalRecord}
              loading={loading}
              onClickPagination={onClickPagination}
            />
          </Container>
        </main>
      </Container>

      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </Box>
  );
}
