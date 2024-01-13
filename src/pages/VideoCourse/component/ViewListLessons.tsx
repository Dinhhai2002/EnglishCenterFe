import { Grid, Skeleton } from "@mui/material";
import ListLessons from "./ListLessons";
import ListLessonsSkeleton from "./ListLessonsSkeleton";
import classNames from "classnames/bind";
import styles from "../VideoCourse.module.scss";

const cx = classNames.bind(styles);

function ViewListLessons({
  loading,
  isLoading,
  course,
  handleChangeNavigate,
  lessonsId,
  courseId,
}: any) {
  return (
    <Grid className={cx("item-2")} item xs={2}>
      <div className={cx("item-2-content")}>
        <div className={cx("header")}>
          {loading || isLoading ? (
            <Skeleton variant="text" height={60} sx={{ margin: 1 }} />
          ) : (
            <h3>Nội dung khóa học</h3>
          )}
        </div>
        <div className={cx("panel")}>
          {loading ? (
            <ListLessonsSkeleton />
          ) : (
            <ListLessons
              course={course}
              handleChangeNavigate={handleChangeNavigate}
              lessonsId={lessonsId}
              courseId={courseId}
            />
          )}
        </div>
      </div>
    </Grid>
  );
}

export default ViewListLessons;
