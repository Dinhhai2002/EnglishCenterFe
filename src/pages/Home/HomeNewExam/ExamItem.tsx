import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, Tooltip } from "@mui/material";
import {
  faClock,
  faUserPen,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./HomeNewExam.module.scss";
import { Button } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import TagIcon from "@mui/icons-material/Tag";

const cx = classNames.bind(styles);
function ExamItem({ exam }: any) {
  return (
    <>
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
      <Chip
        sx={{ margin: "16px 0" }}
        variant="outlined"
        color="primary"
        icon={<TagIcon />}
        label="TOEIC"
      />
      <Button
        component={RouterLink}
        to={`/tests/${exam.id}/${exam.topic_name}`}
        variant="outlined"
        fullWidth
      >
        Xem chi tiết
      </Button>
    </>
  );
}

export default ExamItem;
