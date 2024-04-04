import courseAdminApiService from "@/services/API/Admin/CourseAdminApiService";
import postApiService from "@/services/API/PostApiService";
import { LIMIT_DEFAULt, PAGE_DEFAULT } from "@/utils/Constant";
import { StatusEnum } from "@/utils/enum/StatusEnum";
import { StatusPostEnum } from "@/utils/enum/StatusPostEnum";
import { Box, Divider } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
// import XIcon from "@mui/icons-material/X";

import { useParams } from "react-router-dom";
import Header from "../Blog/components/Header";
import Main from "../Blog/components/Main";
import Sidebar from "../Blog/components/Sidebar";
import RatingComponent from "./Rating";

export default function BlogDetail() {
  const [post, setPost] = useState<any>({});
  const [posts, setPosts] = useState<any>([]);
  const [courses, setCourses] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [categoryBlogId, setCategoryBlogId] = useState<number>(0);

  const { id } = useParams();

  useEffect(() => {
    postApiService
      .findOne(Number(id))
      .then((data: any) => {
        setPost(data.data);
        setCategoryBlogId(data.data.category_blog_id);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
    courseAdminApiService
      .getAll("", StatusEnum.ON, PAGE_DEFAULT, LIMIT_DEFAULt / 2)
      .then((data: any) => {
        setCourses(data.data.list);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    postApiService
      .getAll(
        categoryBlogId,
        "",
        StatusPostEnum.ACTIVE,
        PAGE_DEFAULT,
        LIMIT_DEFAULt
      )
      .then((data: any) => {
        setPosts(data.data.list);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  }, [categoryBlogId]);

  return (
    <Box>
      <Container maxWidth="lg">
        <Header
          title="Blog English Center"
          isCategory={true}
          handleClickCategoryBlog={() => {}}
        />
        <main>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main post={post} loading={loading} />

            <Sidebar
              title={`Các khóa học phổ biến`}
              courses={courses}
              archives={posts}
              categoryId={1}
              loading={loading}
            />
          </Grid>
          <Divider sx={{ marginY: 2 }}></Divider>
          <RatingComponent post={post} setPost={setPost} />
        </main>
      </Container>
    </Box>
  );
}
