import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import classNames from "classnames/bind";
import styles from "../ResultExamDetail.module.scss";
import DialogDetailAnswer from "./DialogDetailAnswer";

const cx = classNames.bind(styles);
function ItemAnswer({
  handleClickOpenDetail,
  handleCloseDetail,
  openDialogMapDetail,
  item,
}: any) {
  //   const resultContext = useContext(ResultContext);

  return (
    <Grid sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
      <Avatar sx={{ bgcolor: "#1976d2" }}>{item.sort}</Avatar>
      {!item.is_answer ? (
        <Typography sx={{ marginLeft: 1 }} variant="body1">
          Chưa trả lời
        </Typography>
      ) : (
        <>
          <Typography sx={{ marginLeft: 1 }} variant="body1">
            {item.answer_correct} :
          </Typography>
          <Typography
            className={!item.is_correct ? cx("text-through") : ""}
            sx={{ marginLeft: 1, marginRight: 1 }}
            variant="body1"
          >
            {item.answer_user_choose}
          </Typography>
          {item.is_correct ? (
            <CheckIcon color="success" />
          ) : (
            <CloseIcon color="warning" />
          )}
        </>
      )}
      <Button
        onClick={() => {
          handleClickOpenDetail(item.id);
        }}
        sx={{ marginLeft: 1 }}
        variant="outlined"
      >
        Chi tiết
      </Button>
      {openDialogMapDetail[item.id] && (
        <DialogDetailAnswer
          handleCloseDetail={handleCloseDetail}
          openDialogMapDetail={openDialogMapDetail}
          id={item.id}
        />
      )}
    </Grid>
  );
}

export default ItemAnswer;
