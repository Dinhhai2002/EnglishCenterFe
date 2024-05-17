import {
  faBullseye,
  faCalendarDay,
  faMoneyCheck,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import dayjs from "dayjs";
import targetApiService from "@/services/API/TargetApiService";
import formatTimeUtils from "@/utils/FormatTimeUtils";
import { toast } from "react-toastify";
import DialogTarget from "./DialogTarget";
import { EditSuccess } from "@/utils/MessageToast";
import { Button } from "@mui/material";
const cx = classNames.bind(styles);

function HeaderHome({ username }: any) {
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateTarget, setDateTarget] = useState("");
  const [target, setTarget] = useState<any>({});
  const [point, setPoint] = useState("");
  const [isTarget, setIsTarget] = useState(false);

  const handleChangePoint = (event: any) => {
    const result = event.target.value.replace(/\D/g, "");

    setPoint(result);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setPoint(target.point_target);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    targetApiService
      .getByUserId()
      .then((data: any) => {
        setTarget(data.data);
        setIsTarget(true);
      })
      .catch((error: any) => {
        setIsTarget(false);
      });
  }, []);

  useEffect(() => {
    if (isTarget) {
      setPoint(target.point_target);
      setDateTarget(target.time_exam);
    }
  }, [target]);

  let daysDiff: any = 0;
  // xử lí số ngày còn lại
  if (isTarget) {
    daysDiff = formatTimeUtils.calculateDateTarget(dateTarget);
  }

  const formattedDate = currentDate
    ? dayjs(currentDate).format("DD/MM/YYYY")
    : dateTarget;

  const handleSubmitTarget = () => {
    const validateDate: any =
      formatTimeUtils.calculateDateTarget(formattedDate);

    if (validateDate < 0) {
      toast.error(`Ngày nhập vào phải lớn hơn ngày hiện tại`);
      return;
    }

    if (Number(point) > 990) {
      toast.error(`Số điểm tối đa là 990`);
      return;
    }

    if (isTarget) {
      targetApiService
        .update(target.id, formattedDate, point)
        .then((data: any) => {
          setTarget(data.data);
          setPoint(target.point_target);
          toast.success(EditSuccess);
          handleClose();
        })
        .catch((error: any) => {});
    } else {
      targetApiService
        .create(formattedDate, point)
        .then((data: any) => {
          setTarget(data.data);
          setPoint(target.point_target);
          setIsTarget(true);
          handleClose();
        })
        .catch((error: any) => {});
    }
  };

  return (
    <header className={cx("header")}>
      <div className={cx("header-left")}>
        <div className={cx("element")}>
          <h2>Xin chào, {username}</h2>
        </div>
      </div>
      {isTarget ? (
        <div className={cx("header-right")}>
          <div className={cx("element")}>
            <div className={cx("item")}>
              <FontAwesomeIcon className={cx("icon")} icon={faCalendarDay} />

              <span>Tới kỳ thi TOEIC</span>
            </div>
            <p>{daysDiff + 1 >= 0 ? daysDiff + 1 : 0} ngày</p>
          </div>
          <div className={cx("element")}>
            <div className={cx("item")}>
              <FontAwesomeIcon className={cx("icon")} icon={faMoneyCheck} />

              <span>Ngày dự thi</span>
              <FontAwesomeIcon
                onClick={handleClickOpen}
                className={cx("icon")}
                icon={faPencil}
              />
            </div>
            <p>{dateTarget}</p>
          </div>
          <div className={cx("element")}>
            <div className={cx("item")}>
              <FontAwesomeIcon className={cx("icon")} icon={faBullseye} />

              <span>Target score </span>
              <FontAwesomeIcon
                onClick={handleClickOpen}
                className={cx("icon")}
                icon={faPencil}
              />
            </div>
            <p>{target.point_target}</p>
          </div>
        </div>
      ) : (
        <div className={cx("header-right")}>
          <Button variant="contained" onClick={handleClickOpen}>
            Tạo mục tiêu
          </Button>
        </div>
      )}

      {/* show target chỉnh sửa */}
      <DialogTarget
        open={open}
        handleClose={handleClose}
        setCurrentDate={setCurrentDate}
        point={point}
        dateTarget={dateTarget}
        handleChangePoint={handleChangePoint}
        handleSubmitTarget={handleSubmitTarget}
      />
    </header>
  );
}

export default HeaderHome;
