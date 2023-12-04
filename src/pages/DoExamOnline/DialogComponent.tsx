import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Zoom,
} from "@mui/material";

function DialogComponent({ open, handleClose, handleSubmit, loading }: any) {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Zoom}
        transitionDuration={600}
      >
        <DialogTitle sx={{ fontSize: 16 }} id="alert-dialog-title">
          {"Bạn có chắc muốn nộp bài?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontSize: 16 }}
            id="alert-dialog-description"
          >
            Chọn Có hoặc Không để xác nhận lựa chọn của mình
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={handleSubmit}
            loading={loading}
            autoFocus
            variant="outlined"
          >
            có
          </LoadingButton>
          <Button onClick={handleClose} autoFocus variant="outlined">
            không
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogComponent;
