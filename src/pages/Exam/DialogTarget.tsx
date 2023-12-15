import Button from "@/components/Button/Button";
import FormatTimeUtils from "@/utils/FormatTimeUtils";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Zoom,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import classNames from "classnames/bind";
import dayjs from "dayjs";
import styles from "./Exam.module.scss";

const cx = classNames.bind(styles);

function DialogTarget({
  open,
  handleClose,
  setCurrentDate,
  point,
  handleChangePoint,
  handleSubmitTarget,
  dateTarget,
}: any) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Zoom}
      transitionDuration={600}
    >
      <DialogTitle sx={{ fontSize: 16 }} id="alert-dialog-title">
        {"Thay đổi điểm mục tiêu"}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            fontSize: 20,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className={cx("modal")}>
          <div className={cx("modal-item")}>
            <h3 style={{ marginBottom: "20px" }}>Ngày dự thi</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Ngày dự thi"
                  // value={target.time_exam ?target.time_exam: ""}
                  onChange={(newValue: any) => setCurrentDate(newValue)}
                  views={["year", "month", "day"]}
                  defaultValue={
                    dateTarget
                      ? dayjs(
                          new Date(
                            FormatTimeUtils.createDateFromDMY(dateTarget)
                          )
                        )
                      : dayjs(new Date())
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className={cx("modal-item")}>
            <h3>Điểm mục tiêu</h3>
            <TextField
              margin="normal"
              required
              fullWidth
              name="point"
              label="Điểm"
              type="number"
              autoComplete="point"
              value={point ? point : 0}
              onChange={handleChangePoint}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmitTarget} content="Lưu" primary />
      </DialogActions>
    </Dialog>
  );
}

export default DialogTarget;
