import SlideImage from "@/components/SildeImage.tsx/SiideImage";
import classNames from "classnames/bind";
import HomeCourseOnline from "../Home/HomeCourseOnline/HomeCourseOnline";
import styles from "./CourseOnline.module.scss";

const cx = classNames.bind(styles);

function CourseOnline() {
  return (
    <div className={cx("body")}>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <SlideImage />
          <HomeCourseOnline
            isPagination
            isBanner
            position="left"
            title="Combo khoá học đặc biệt:"
            categoryExam="TOEIC"
          />
        </div>
      </div>
    </div>
  );
}

export default CourseOnline;
