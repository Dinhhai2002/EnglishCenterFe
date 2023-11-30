import classNames from "classnames/bind";
import styles from "./HomeNewExam.module.scss";

import ExamItem from "./ExamItem";
import ExamItemSkeleton from "./ExamItemSkeleton";

const cx = classNames.bind(styles);

function HomeNewExam({ listExam, position, title }: any) {
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h2 className={cx(`${position}`)}>{title}</h2>
      </div>
      <div className={cx("content")}>
        <div className={cx("content-list-4")}>
          {listExam.map((exam: any, index: number) => (
            <div key={index} className={cx("content-item-4")}>
              <ExamItemSkeleton />
              {/* <ExamItem exam={exam} /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeNewExam;
