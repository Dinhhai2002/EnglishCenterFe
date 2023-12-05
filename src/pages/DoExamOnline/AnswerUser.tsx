import { Button, Grid } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./DoExamOnline.module.scss";

const cx = classNames.bind(styles);
function AnswerUser({ minutes, seconds, handleClickOpen, listId }: any) {
  return (
    <>
      <div className={cx("content_time")}>
        <h2>Thời gian còn lại:</h2>
        <div>
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
      </div>
      <Button
        sx={{ marginBottom: 2, marginTop: 2, padding: 1 }}
        variant="outlined"
        fullWidth
        onClick={handleClickOpen}
      >
        Nộp Bài
      </Button>

      <div className={cx("list-item-block")}>
        {Array.from({ length: 200 }, (_, index) => (
          <Grid item xs={2.4} key={index}>
            <span
              className={cx(
                "questions-listitem",
                listId.includes(index) && "done"
              )}
            >
              {index + 1}
            </span>
          </Grid>
        ))}
      </div>
    </>
  );
}

export default AnswerUser;
