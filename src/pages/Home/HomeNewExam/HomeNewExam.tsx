import classNames from "classnames/bind";
import styles from "./HomeNewExam.module.scss";

import ExamItem from "./ExamItem";
import ExamItemSkeleton from "./ExamItemSkeleton";
import Empty from "@/components/Empty/Empty";

const cx = classNames.bind(styles);

function HomeNewExam({ listExam, isLoading, position, title }: any) {
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h2 className={cx(`${position}`)}>{title}</h2>
      </div>
      <div className={cx("content")}>
        <div className={cx("content-list-4")}>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className={cx("content-item-4")}>
                <ExamItemSkeleton />
              </div>
            ))
          ) : listExam.length > 0 ? (
            listExam.map((exam: any, index: number) => (
              <div key={index} className={cx("content-item-4")}>
                <ExamItem exam={exam} />
              </div>
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeNewExam;
