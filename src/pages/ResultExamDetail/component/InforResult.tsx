import Tags from "@/components/Tags/Tags";
import {
  faBullseye,
  faCheck,
  faCircleCheck,
  faCircleMinus,
  faCircleXmark,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "../ResultExamDetail.module.scss";

const cx = classNames.bind(styles);
function InforResult({ handleSubmitViewResult, result }: any) {
  return (
    <>
      {/* <Alert sx={{ fontSize: 16, marginBottom: 3 }} severity="success">
        Chú ý: Bạn có thể tạo flashcards từ highlights (bao gồm các highlights
        các bạn đã tạo trước đây) trong trang chi tiết kết quả bài thi.
      </Alert> */}
      <Typography sx={{ margin: 1 }} variant="h6">
        Kết quả luyện tập: {result.name_exam}
      </Typography>
      <div className={cx("header-tags")}>
        <Tags
          title="quay về trang đề thi"
          normally
          to={`/tests/${result.exam_id}/${result.name_exam}`}
        />
      </div>
      <Grid
        sx={{ marginTop: 0.5 }}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid className={cx("grid-item")} item xs={3}>
          <div className={cx("list-item")}>
            <div className={cx("item")}>
              <FontAwesomeIcon className={cx("icon")} icon={faCheck} />
              <p>Kết quả làm bài</p>
              <p> {result.total_question_correct}/200</p>
            </div>
            <div className={cx("item")}>
              <FontAwesomeIcon className={cx("icon")} icon={faBullseye} />
              <p>Độ chính xác (#đúng/#tổng)</p>
              <p>{(result.total_question_correct / 200) * 100}%</p>
            </div>
            <div className={cx("item")}>
              <FontAwesomeIcon className={cx("icon")} icon={faClock} />
              <p>Thời gian hoàn thành</p>
              <p>{result.time_complete}</p>
            </div>
          </div>
        </Grid>
        <Grid className={cx("grid-item")} item xs={3}>
          <div className={cx("list-item")}>
            <FontAwesomeIcon
              className={cx("icon", "success")}
              icon={faCircleCheck}
            />
            <p className={cx("success")}>Trả lời đúng</p>
            <p>{result.total_question_correct}</p>
            <p>câu hỏi</p>
          </div>
        </Grid>
        <Grid className={cx("grid-item")} item xs={3}>
          <div className={cx("list-item")}>
            <FontAwesomeIcon
              className={cx("icon", "error")}
              icon={faCircleXmark}
            />
            <p className={cx("error")}>Trả lời sai</p>
            <p>{200 - result.total_question_correct}</p>
            <p>câu hỏi</p>
          </div>
        </Grid>
        <Grid className={cx("grid-item")} item xs={3}>
          <div className={cx("list-item")}>
            <FontAwesomeIcon className={cx("icon")} icon={faCircleMinus} />
            <p className={cx("text-success")}>Bỏ qua</p>
            <p>{result.total_question_skip}</p>
            <p>câu hỏi</p>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default InforResult;
