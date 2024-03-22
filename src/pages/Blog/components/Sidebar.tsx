import * as React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import classNames from "classnames/bind";
import styles from "../Blog.module.scss";
import { Post } from "@/types/Post";
import { Course } from "@/types/Course";

interface SidebarProps {
  archives: Post[];
  title: string;
  categoryId?: number;
  courses: Course[];
}

const cx = classNames.bind(styles);

export default function Sidebar(props: SidebarProps) {
  const { archives, title, categoryId, courses } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {courses.map((course) => (
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
        ))}
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Các bài viết liên quan
      </Typography>
      {archives.map((archive) => (
        <Link
          display="block"
          variant="body1"
          href={`/blog/${archive.id}`}
          key={archive.title}
        >
          <Typography
            className={cx("title")}
            variant="body2"
            gutterBottom
            sx={{ mt: 3 }}
          >
            {archive.title}
          </Typography>
        </Link>
      ))}
    </Grid>
  );
}
