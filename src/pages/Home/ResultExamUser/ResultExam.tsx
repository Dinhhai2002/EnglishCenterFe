import Empty from "@/components/Empty/Empty";
import { routes } from "@/routes/routes";
import resultApiService from "@/services/API/ResultApiService";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import styles from "./ResultExam.module.scss";

const cx = classNames.bind(styles);

function ResultExam() {
  const [listResult, setListResult] = useState([]);

  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";

  useEffect(() => {
    resultApiService.setToken(token);
    resultApiService
      .getAll(-1, "", 0, 8)
      .then((data: any) => {
        setListResult(data.data.list);
      })
      .catch((error: any) => {});
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h2>Kết quả luyện thi mới nhất</h2>
        {/* <div className={cx("header_right")}>
          <FontAwesomeIcon className={cx("icon")} icon={faChartSimple} />
          <p>Thống kê kết quả luyện thi</p>
        </div> */}
      </div>
      <div className={cx("content")}>
        <div className={cx("content-list-4")}>
          {listResult.length > 0 ? (
            listResult.map((item: any, index: number) => (
              <div key={index} className={cx("content-item-4")}>
                <h2>{item.name_exam}</h2>
                <p>Ngày làm bài: {item.created_at}</p>
                <p>Thời gian hoàn thành: {item.time_complete}</p>
                <p>Kết quả: {item.total_question_correct}/100</p>
                <p>Điểm: {item.total_point}</p>
                <Button
                  to={`/tests/${item.exam_id}/${item.name_exam}/results/${item.id}`}
                  primary
                  block
                  content="Xem chi tiết"
                />
              </div>
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
      <div className={cx("btn-link")}>
        {listResult.length > 0 && (
          <Button outline content="Xem tất cả" to={routes.Profile} />
        )}
      </div>
    </div>
  );
}

export default ResultExam;
