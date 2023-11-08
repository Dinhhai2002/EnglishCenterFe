import authenticationApiService from "@/services/API/AuthenticationApiService";
import { Grid } from "@mui/material";
import { useLayoutEffect, useState } from "react";

import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import styles from "./CourseDetail.module.scss";
import ListChapter from "./ListChapter";
import RegisterCourse from "./RegisterCourse";

const cx = classNames.bind(styles);


function CourseDetail() {
  const [course, setCourse] = useState<any>({});

  const { id } = useParams();

  useLayoutEffect(() => {
    authenticationApiService
      .getDetailCourse(Number(id))
      .then((data: any) => {
        setCourse(data.data);
      })
      .catch((error: any) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx("body")}>
      <div className={cx("content")}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div className={cx("header-title")}>
                <h2>{course.name}</h2>
                <p>{course.description}</p>
              </div>
              <div className={cx("container")}>
                <div className={cx("container-header")}>
                  <h2>Nội dung khóa học</h2>
                  <p>
                    <strong>{course.count_chapter}</strong> chương |{" "}
                    <strong>{course.count_lessons}</strong> bài học
                  </p>
                </div>
                <ListChapter course={course} id={id} />
              </div>
            </Grid>
            <RegisterCourse course={course} id={id} />
          </Grid>
      </div>
    </div>
  );
}

export default CourseDetail;
