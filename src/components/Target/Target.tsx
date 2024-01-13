import formatTimeUtils from "@/utils/FormatTimeUtils";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./Target.module.scss";

const cx = classNames.bind(styles);

function Target({ target, isTarget, url, username, CategoryNameExam }: any) {
  // const [currentDate, setCurrentDate] = useState("");
  const [dateTarget, setDateTarget] = useState("");
  const [point, setPoint] = useState("");

  useEffect(() => {
    setPoint(target.point_target);
    setDateTarget(target.time_exam);
  }, [target]);

  let daysDiff: any = 0;
  // xử lí số ngày còn lại
  if (isTarget) {
    daysDiff = formatTimeUtils.calculateDateTarget(target.time_exam);
  }

  return (
    <div className={cx("body")}>
      <div className={cx("header")}>
        <img src={url} alt="noImage" />
        <h2>{username}</h2>
      </div>
      <div className={cx("content")}>
        <h3>{CategoryNameExam}</h3>
        <div className={cx("content-item")}>
          <p>Ngày dự thi:</p>
          <p>{dateTarget}</p>
        </div>
        <div className={cx("content-item")}>
          <p>Tới kỳ thi:</p>
          <p>{daysDiff + 1 > 0 ? daysDiff + 1 : 0} ngày</p>
        </div>
        <div className={cx("content-item")}>
          <p>Điểm mục tiêu:</p>
          <p>{point}</p>
        </div>
      </div>
    </div>
  );
}

export default Target;
