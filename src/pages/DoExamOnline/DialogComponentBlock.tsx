import Button from "@/components/Button/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function DialogComponentBlock({ showDialog, cancelNavigation, confirmNavigation }: any) {
  return (
    <>
      <Dialog
        open={showDialog}
        onClose={cancelNavigation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
          <Button onClick={confirmNavigation} content="Có" primary />
          <Button onClick={cancelNavigation} content="Không" primary />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogComponentBlock;
