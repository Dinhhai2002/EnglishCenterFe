import Container from "@mui/material/Container";

import authenticationApiService from "@/services/API/AuthenticationApiService";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/Constant";
import { StatusPostEnum } from "@/utils/enum/StatusPostEnum";
import { Box, Divider } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./Blog.module.scss";
import CreateBlog from "./components/CreateBlog";
import Header from "./components/Header";
import ListBlog from "./components/ListBlog";
import MainFeaturedPost from "./components/MainFeaturedPost";

const cx = classNames.bind(styles);

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  // image: "https://source.unsplash.com/random?wallpapers",
  // image:
  //   "https://firebasestorage.googleapis.com/v0/b/uploadimage-aa334.appspot.com/o/banner-main-blog.png?alt=media",
  image:
    "https://firebasestorage.googleapis.com/v0/b/uploadimage-aa334.appspot.com/o/banner-blog-1.png?alt=media",
  imageText: "main image description",
  linkText: "",
};

export default function Blog() {
  const [categoryBlog, setCategoryBlog] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalRecord, setTotalRecord] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPost = (
    categoryBlogId?: number,
    keySearch?: string,
    status?: number,
    page?: number,
    limit?: number
  ) => {
    authenticationApiService
      .getAllPost(-1, categoryBlogId, keySearch, status, page, limit)
      .then((data: any) => {
        setPosts(data.data.list);
        setTotalRecord(data.data.total_record);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  };
  const fetchCategoryBlog = () => {
    authenticationApiService
      .getAllCategoryBlog()
      .then((data: any) => {
        setCategoryBlog(data.data);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchCategoryBlog();
    fetchPost(-1, "", StatusPostEnum.ACTIVE, PAGE_DEFAULT, LIMIT_DEFAULT);
  }, []);

  const handleClickCategoryBlog = (id: number) => {
    setLoading(true);
    fetchPost(id, "", StatusPostEnum.ACTIVE, PAGE_DEFAULT, LIMIT_DEFAULT);
  };

  const onClickPagination = (page: number, limit: number) => {
    setLoading(true);
    fetchPost(-1, "", StatusPostEnum.ACTIVE, page, limit);
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

          <CreateBlog />
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
    </Box>
  );
}
