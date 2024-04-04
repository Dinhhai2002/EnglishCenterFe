import { Course } from "@/types/Course";
import { Post } from "@/types/Post";
import { Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import classNames from "classnames/bind";
import styles from "../Blog.module.scss";

interface SidebarProps {
  archives: Post[];
  title: string;
  categoryId?: number;
  courses: Course[];
  loading: boolean;
}

const cx = classNames.bind(styles);

export default function Sidebar(props: SidebarProps) {
  const { archives, title, categoryId, courses, loading } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.100" }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          courses.map((course) => (
            <Link
              display="block"
              variant="body1"
              href={`/course/${course.id}`}
              key={course.id}
            >
              <Typography
                className={cx("title")}
                variant="body2"
                gutterBottom
                sx={{ mt: 3 }}
              >
                {course.name}
              </Typography>
            </Link>
          ))
        )}
      </Paper>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.100", marginY: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Các bài viết liên quan
        </Typography>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          archives.map((archive) => (
            <Link
              display="block"
              variant="body1"
              href={`/blog/${archive.id}`}
              key={archive.title}
            >
              <Typography
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
                gutterBottom
              >
                {archive.title}
              </Typography>
            </Link>
          ))
        )}
      </Paper>
    </Grid>
  );
}
