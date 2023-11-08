import { createTheme, ThemeProvider } from "@mui/material";
import classNames from "classnames/bind";
import { Zoom } from "react-slideshow-image";
import HomeCourseOnline from "../Home/HomeCourseOnline/HomeCourseOnline";
import styles from "./CourseOnline.module.scss";

const cx = classNames.bind(styles);

const images = [
  "https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
  "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
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
