import HeaderHome from "./HomeHeader/HeaderHome";

import utils from "@/utils/Utils";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import HomeCourseOnline from "./HomeCourseOnline/HomeCourseOnline";
import HomeNewExam from "./HomeNewExam/HomeNewExam";
import ResultExam from "./ResultExamUser/ResultExam";
import { useLayoutEffect, useState } from "react";
import authenticationApiService from "@/services/API/AuthenticationApiService";
import { StatusEnum } from "@/utils/enum/StatusEnum";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/Constant";
import ListBlog from "../Blog/components/ListBlog";
import { StatusPostEnum } from "@/utils/enum/StatusPostEnum";
import { Divider, Typography } from "@mui/material";
import { brand } from "@/styles/themeCustom";
import SlideImage from "@/components/SildeImage.tsx/SiideImage";

const cx = classNames.bind(styles);

const Home = () => {
  const { currentUser, isCurrentUser } = utils.getCurrentUser();
  const [listExam, setListExam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [totalRecord, setTotalRecord] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    authenticationApiService
      .getAllExam(-1, -1, StatusEnum.ON, "", PAGE_DEFAULT, LIMIT_DEFAULT - 2)
      .then((data: any) => {
        setListExam(data.data.list);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
      });

    authenticationApiService
      .getAllPost(
        -1,
        -1,
        "",
        StatusPostEnum.ACTIVE,
        PAGE_DEFAULT,
        LIMIT_DEFAULT - 4
      )
      .then((data: any) => {
        setPosts(data.data.list);
        setTotalRecord(data.data.total_record);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={cx("body")}>
      {isCurrentUser && (
        <div className={cx("container", "background")}>
          <div className={cx("content")}>
            <HeaderHome username={isCurrentUser ? currentUser.user_name : ""} />

            <ResultExam />
          </div>
        </div>
      )}
      <div className={cx("container")}>
        <div className={cx("content")}>
          <SlideImage />

          <HomeCourseOnline
            isBanner
            position="left"
            title="Combo khoá học đặc biệt:"
            categoryExam="TOEIC"
            isSearch={false}
          />

          <HomeNewExam
            listExam={listExam}
            isLoading={isLoading}
            position="center"
            title="Đề thi mới nhất"
          />
          <Typography variant="h4" sx={{ marginY: 4, color: brand[600] }}>
            <strong> Danh sách Blog</strong>
            <Divider></Divider>
          </Typography>
          <ListBlog
            posts={posts}
            totalRecord={totalRecord}
            loading={loading}
            onClickPagination={() => {}}
            isPagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
