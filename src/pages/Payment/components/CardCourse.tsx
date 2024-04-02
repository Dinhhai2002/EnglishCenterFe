import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Course } from "@/types/Course";
import TypographyComponent from "@/components/TypographyComponent/TypographyComponent";

interface CardCourseProps {
  course: Course;
}

export default function CardCourse({ course }: CardCourseProps) {
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151, objectFit: "contain" }}
        image={course.banner}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {course.name}
          </Typography>
          <TypographyComponent
            content={course.description}
            strong={false}
          ></TypographyComponent>
        </CardContent>
        <Typography
          sx={{ marginX: 2 }}
          variant="subtitle1"
          color="text.secondary"
          component="div"
        >
          <strong>{course.lessons}</strong> bài học
        </Typography>
      </Box>
    </Card>
  );
}
