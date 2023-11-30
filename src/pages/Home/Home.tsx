import { useLayoutEffect, useState } from "react";
import HeaderHome from "./HomeHeader/HeaderHome";

import authenticationApiService from "@/services/API/AuthenticationApiService";
import utils from "@/utils/Utils";
import classNames from "classnames/bind";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./Home.module.scss";
import HomeCourseOnline from "./HomeCourseOnline/HomeCourseOnline";
import HomeNewExam from "./HomeNewExam/HomeNewExam";
import ResultExam from "./ResultExamUser/ResultExam";

const cx = classNames.bind(styles);


const images = [
  "https://firebasestorage.googleapis.com/v0/b/uploadimage-aa334.appspot.com/o/TALK-baner-home-3.jpg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/uploadimage-aa334.appspot.com/o/banner1.jpg?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/uploadimage-aa334.appspot.com/o/baner-home-1.png?alt=media",
];

const Home = () => {
  const [listExam, setListExam] = useState([]);
  const { currentUser, isCurrentUser } = utils.getCurrentUser();

  useLayoutEffect(() => {
    authenticationApiService
      .getAllExam(-1, 1, "", 1, 8)
      .then((data: any) => {
        setListExam(data.data.list);
      })
      .catch((error: any) => {});
  }, []);

  return (
    <div className={cx("body")}>
        {isCurrentUser && (
          <div className={cx("container", "background")}>
            <div className={cx("content")}>
              <HeaderHome
                username={isCurrentUser ? currentUser.user_name : ""}
              />

              <ResultExam />
            </div>
          </div>
        )}
        <div className={cx("container")}>
          <div className={cx("content")}>
            <Zoom scale={0.7} indicators={true} autoplay>
              {images.map((each, index) => (
                <div
                  key={index}
                  style={{ width: "100%", height: "300px", marginTop: "40px" }}
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
              isBanner
              position="left"
              title="Combo khoá học đặc biệt:"
              categoryExam="TOEIC"
            />

            <HomeNewExam
              listExam={listExam}
              position="center"
              title="Đề thi mới nhất"
            />
          </div>
        </div>
    </div>
  );
};

export default Home;
