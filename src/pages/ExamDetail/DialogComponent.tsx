import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Zoom,
} from "@mui/material";

function DialogComponent({ open, handleClose, handleSubmit }: any) {
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
          {"Bạn có chắc muốn làm bài test không?"}
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
          <Button variant="outlined" onClick={handleSubmit}>
            Có
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Không
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogComponent;
