import { Grid, Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import styles from "../CourseDetail.module.scss";
import ListChapterSkeleton from "./ListChapterSkeleton";
import RegisterCourseSkeleton from "./RegisterCourseSkeleton";

const cx = classNames.bind(styles);
function CourseDetailSkeleton() {
  return (
    <div className={cx("body")}>
      <div className={cx("content")}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div className={cx("header-title")}>
              <Skeleton sx={{ marginTop: 1 }} variant="text" />
              <Skeleton sx={{ marginTop: 1 }} variant="text" />
            </div>
            <div className={cx("container")}>
              <div className={cx("container-header")}>
                <Skeleton sx={{ marginTop: 1 }} variant="text" />
                <p>
                  <Skeleton sx={{ marginTop: 1 }} variant="text" />
                </p>
              </div>
              <ListChapterSkeleton />
            </div>
          </Grid>
          <RegisterCourseSkeleton />
        </Grid>
      </div>
    </div>
  );
}

export default CourseDetailSkeleton;
