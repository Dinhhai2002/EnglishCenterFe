import classNames from "classnames/bind";
import styles from "./HomeNewExam.module.scss";

import ExamItem from "./ExamItem";
import ExamItemSkeleton from "./ExamItemSkeleton";
import { useLayoutEffect, useState } from "react";
import authenticationApiService from "@/services/API/AuthenticationApiService";

const cx = classNames.bind(styles);

function HomeNewExam({ position, title }: any) {
  const [listExam, setListExam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    authenticationApiService
      .getAllExam(-1, 1, "", 1, 8)
      .then((data: any) => {
        setListExam(data.data.list);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
      });
  }, []);
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h2 className={cx(`${position}`)}>{title}</h2>
      </div>
      <div className={cx("content")}>
        <div className={cx("content-list-4")}>
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={cx("content-item-4")}>
                  <ExamItemSkeleton />
                </div>
              ))
            : listExam.map((exam: any, index: number) => (
                <div key={index} className={cx("content-item-4")}>
                  <ExamItem exam={exam} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default HomeNewExam;
