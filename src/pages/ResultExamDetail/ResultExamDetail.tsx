import {
  faBullseye,
  faCheck,
  faCircleCheck,
  faCircleMinus,
  faCircleXmark,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Box, CircularProgress, Grid } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tags from "../../components/Tags/Tags";
import styles from "./ResultExamDetail.module.scss";

import resultApiService from "@/services/API/ResultApiService";
import { FunctionIsDevelopment } from "@/utils/MessageToast";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function ResultExamDetail() {
  const [result, setResult] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { resultId } = useParams();

  useEffect(() => {
    resultApiService
      .getDetail(resultId)
      .then((data: any) => {
        setResult(data.data);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitViewResult = () => {
    toast.success(`${FunctionIsDevelopment}`);
    return;
  };

  return (
    <div className={cx("body")}>
      <div className={cx("container")}>
        <div className={cx("content")}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Alert sx={{ fontSize: 16, marginBottom: 3 }} severity="success">
                Chú ý: Bạn có thể tạo flashcards từ highlights (bao gồm các
                highlights các bạn đã tạo trước đây) trong trang chi tiết kết
                quả bài thi.
              </Alert>
              <h3>Kết quả luyện tập: {result.name_exam} </h3>
              <div className={cx("header-tags")}>
                <Tags
                  onClick={handleSubmitViewResult}
                  title="Xem đáp án"
                  active
                />
                <Tags
                  title="quay về trang đề thi"
                  normally
                  to={`/tests/${result.exam_id}/${result.name_exam}`}
                />
              </div>
              <Grid
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
                      <FontAwesomeIcon
                        className={cx("icon")}
                        icon={faBullseye}
                      />
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
                    <FontAwesomeIcon
                      className={cx("icon")}
                      icon={faCircleMinus}
                    />
                    <p className={cx("text-success")}>Bỏ qua</p>
                    <p>{result.total_question_skip}</p>
                    <p>câu hỏi</p>
                  </div>
                </Grid>
              </Grid>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultExamDetail;
