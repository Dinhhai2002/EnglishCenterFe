import authenticationApiService from "@/services/API/AuthenticationApiService";
import { Grid, Skeleton } from "@mui/material";
import { useLayoutEffect, useState } from "react";

import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import styles from "./CourseDetail.module.scss";
import ListChapter from "./ListChapter";
import RegisterCourse from "./RegisterCourse";
import ListChapterSkeleton from "./ListChapterSkeleton";
import RegisterCourseSkeleton from "./RegisterCourseSkeleton";

const cx = classNames.bind(styles);

function CourseDetail() {
  const [course, setCourse] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useLayoutEffect(() => {
    authenticationApiService
      .getDetailCourse(Number(id))
      .then((data: any) => {
        setLoading(false);
        setCourse(data.data);
      })
      .catch((error: any) => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx("body")}>
      <div className={cx("content")}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div className={cx("header-title")}>
              {loading ? (
                <>
                  <Skeleton sx={{ marginTop: 1 }} variant="text" />
                  <Skeleton sx={{ marginTop: 1 }} variant="text" />
                </>
              ) : (
                <>
                  <h2>{course.name}</h2>
                  <p>{course.description}</p>
                </>
              )}
            </div>
            <div className={cx("container")}>
              <div className={cx("container-header")}>
                <h2>Nội dung khóa học</h2>
                <p>
                  {loading ? (
                    <Skeleton sx={{ marginTop: 1 }} variant="text" />
                  ) : (
                    <>
                      <strong>{course.count_chapter}</strong> chương |
                      <strong>{course.count_lessons}</strong> bài học
                    </>
                  )}
                </p>
              </div>
              {loading ? (
                <ListChapterSkeleton />
              ) : (
                <ListChapter course={course} id={id} />
              )}
            </div>
          </Grid>
          {loading ? (
            <RegisterCourseSkeleton />
          ) : (
            <RegisterCourse course={course} id={id} />
          )}
        </Grid>
      </div>
    </div>
  );
}

export default CourseDetail;
