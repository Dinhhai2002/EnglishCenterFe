import classNames from "classnames/bind";
import styles from "./HomeNewExam.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faUserPen,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button/Button";
import Tags from "../../../components/Tags/Tags";
import { Tooltip } from "@mui/material";

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
              <h2>{exam.name}</h2>
              <p>Bộ đề thi: {exam.topic_name}</p>
              <div className={cx("detail")}>
                <Tooltip title="Thời gian làm bài" arrow>
                  <div className={cx("item")}>
                    <FontAwesomeIcon className={cx("icon")} icon={faClock} />
                    <p>{exam.time_minutes} phút |</p>
                  </div>
                </Tooltip>
                <Tooltip title="Số lượng người dùng đã làm bài thi" arrow>
                  <div className={cx("item")}>
                    <FontAwesomeIcon className={cx("icon")} icon={faUserPen} />
                    <p>{exam.total_user ? exam.total_user : 0} |</p>
                  </div>
                </Tooltip>
                <Tooltip title="Tổng số comments" arrow>
                  <div className={cx("item")}>
                    <FontAwesomeIcon className={cx("icon")} icon={faComment} />

                    <p>{exam.total_comments ? exam.total_comments : 0}</p>
                  </div>
                </Tooltip>
              </div>
              <div className={cx("detail")}>
                <div className={cx("item")}>
                  <p>{7} phần thi |</p>
                </div>

                <div className={cx("item")}>
                  <p>{exam.total_question} câu hỏi</p>
                </div>
              </div>

              {/* <button className={cx("btn_tag")}>#IELTS Academic</button>
              <button className={cx("btn_tag")}>#Listening</button> */}
              <Tags title="# TOEIC" primary />
              {/* <Tags title="#Listening" primary /> */}

              <Button
                primary
                to={`/tests/${exam.id}/${exam.topic_name}`}
                content="Xem chi tiết"
                block
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeNewExam;
