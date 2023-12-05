import Tags from "@/components/Tags/Tags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./ExamDetail.module.scss";
import { faClock, faUserPen } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function InforExam({ exam, handleTags }: any) {
  return (
    <>
      <h3 className={cx("exams")}>{exam.name}</h3>
      <div className={cx("header-tags")}>
        <Tags onClick={handleTags} title="Thông tin đề thi" active />
        <Tags onClick={handleTags} title="Đáp án/transcript" normally />
      </div>
      <h3 className={cx("exams")}>Bộ đề thi: {exam.topic_name}</h3>
      <div className={cx("detail")}>
        <div className={cx("item")}>
          <FontAwesomeIcon className={cx("icon")} icon={faClock} />
          <p>Thời gian làm bài: {exam.time_minutes} phút |</p>
        </div>
        <div className={cx("item")}>
          <p>7 phần thi |</p>
        </div>
        <div className={cx("item")}>
          <p>{exam.total_question} câu hỏi |</p>
        </div>
        <div className={cx("item")}>
          <p>{exam.total_comments} bình luận</p>
        </div>
      </div>
      <div className={cx("detail")}>
        <div className={cx("item")}>
          <FontAwesomeIcon className={cx("icon")} icon={faUserPen} />
          <p>{exam.total_user} người đã luyện tập đề thi này</p>
        </div>
      </div>
    </>
  );
}

export default InforExam;
