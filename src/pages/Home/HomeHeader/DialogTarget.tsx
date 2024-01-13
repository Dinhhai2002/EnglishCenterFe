import CloseDialog from "@/components/CloseDialog/CloseDialog";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Zoom
} from "@mui/material";
import classNames from "classnames/bind";
import DateComponent from "./DateComponent";
import styles from "./Header.module.scss";

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
      </DialogTitle>
      <CloseDialog handleCloseDialog={handleClose} />
      <DialogContent>
        <div className={cx("modal")}>
          <div className={cx("modal-item")}>
            <h3 style={{ marginBottom: "20px" }}>Ngày dự thi</h3>
            <DateComponent
              setCurrentDate={setCurrentDate}
              dateTarget={dateTarget}
            />
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
        <Button variant="contained" onClick={handleSubmitTarget}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogTarget;
