import { createTheme, ThemeProvider } from "@mui/material";
import classNames from "classnames/bind";
import { Zoom } from "react-slideshow-image";
import HomeCourseOnline from "../Home/HomeCourseOnline/HomeCourseOnline";
import styles from "./CourseOnline.module.scss";

const cx = classNames.bind(styles);

const images = [
  "https://firebasestorage.googleapis.com/v0/b/uploadimage-aa334.appspot.com/o/TALK-baner-home-3.jpg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/uploadimage-aa334.appspot.com/o/banner1.jpg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/uploadimage-aa334.appspot.com/o/baner-home-1.png?alt=media",
];

function CourseOnline() {
  return (
    <div className={cx("body")}>
      <div className={cx("container")}>
          <div className={cx("content")}>
            <Zoom scale={0.7} indicators={true} autoplay>
              {images.map((each, index) => (
                <div
                  key={index}
                  style={{ width: "100%", height: "300px", marginTop: "20px" }}
                >
                  <img
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    alt="Slide Image"
                    src={each}
                  />
                </div>
              ))}
            </Zoom>
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
