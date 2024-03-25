import courseAdminApiService from "@/services/API/Admin/CourseAdminApiService";
import postApiService from "@/services/API/PostApiService";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
// import XIcon from "@mui/icons-material/X";

import { useParams } from "react-router-dom";
import Footer from "../Blog/components/Footer";
import Header from "../Blog/components/Header";
import Main from "../Blog/components/Main";
import Sidebar from "../Blog/components/Sidebar";

export default function BlogDetail() {
  const [post, setPost] = useState<any>({});
  const [posts, setPosts] = useState<any>([]);
  const [courses, setCourses] = useState<any>([]);
  const [categoryBlogId, setCategoryBlogId] = useState<number>(0);



  const { id } = useParams();

  useEffect(() => {
    postApiService
      .findOne(Number(id))
      .then((data: any) => {
        setPost(data.data);
        setCategoryBlogId(data.data.category_blog_id);
      })
      .catch((error: any) => {});
    courseAdminApiService
      .getAll("", 1, 0, 5)
      .then((data: any) => {
        setCourses(data.data.list);
      })
      .catch((error: any) => {});
  }, [id]);

  useEffect(() => {
    postApiService
      .getAll(categoryBlogId, "", 1, 0, 10)
      .then((data: any) => {
        setPosts(data.data.list);
      })
      .catch((error: any) => {});
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
            <Main post={post} />

            <Sidebar
              title={`Các khóa học phổ biến`}
              courses={courses}
              archives={posts}
              categoryId={1}
            />
          </Grid>
        </main>
      </Container>

      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </Box>
  );
}
