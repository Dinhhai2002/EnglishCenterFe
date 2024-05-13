import Image from "@/components/Image/Image";
import { routes } from "@/routes/routes";
import { RequiredLogin } from "@/utils/MessageToast";
import utils from "@/utils/Utils";
import {
  AccessTime,
  BatteryChargingFull,
  ConfirmationNumber,
} from "@mui/icons-material";
import SpeedIcon from "@mui/icons-material/Speed";
import { Button, Grid } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../CourseDetail.module.scss";
import DialogAccept from "./DialogAccept";

const cx = classNames.bind(styles);
function RegisterCourse({ course, id }: any) {
  const [open, setOpen] = useState(false);

  const { isCurrentUser } = utils.getCurrentUser();

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (id: number) => {
    setOpen(false);
  };

  // xử lí nếu chưa login thì đẩy về lại trang login
  const handleSubmitRegister = () => {
    if (isCurrentUser === false) {
      navigate(routes.Login);
      toast.error(`${RequiredLogin}`);
      return;
    }

    if (course.is_free === 1) {
      handleClickOpen();
    } else {
      navigate(`/payment/course/${id}`);
    }
  };

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      item
      xs={4}
    >
      <div className={cx("image")}>
        <Image className={cx("image")} alt="NoImage" src={course.banner} />
      </div>

      <div className={cx("btn")}>
        <h3>{course.is_free === 1 ? "Miễn phí" : ""}</h3>

        <Button
          variant="contained"
          fullWidth
          sx={{ mb: 2 }}
          onClick={handleSubmitRegister}
        >
          Đăng ký
        </Button>
      </div>

      <div className={cx("list")}>
        <div className={cx("item")}>
          <SpeedIcon />
          <p>Trình độ cơ bản</p>
        </div>
        <div className={cx("item")}>
          <ConfirmationNumber />
          <p>Tổng số {course.count_lessons} bài học</p>
        </div>
        <div className={cx("item")}>
          <AccessTime />
          <p>Thời lượng {course.duration_format}</p>
        </div>
        <div className={cx("item")}>
          <BatteryChargingFull />
          <p>Học mọi lúc mọi nơi</p>
        </div>
      </div>
      <DialogAccept open={open} id={course.id} handleClose={handleClose} />
    </Grid>
  );
}

export default RegisterCourse;
