import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import styles from "../CourseDetail.module.scss";

const cx = classNames.bind(styles);
function ListChapterSkeleton() {
  return (
    <div className={cx("panel")}>
      <Skeleton height={60} variant="text" />
      <Skeleton height={60} variant="text" />
      <Skeleton height={60} variant="text" />
    </div>
  );
}

export default ListChapterSkeleton;
