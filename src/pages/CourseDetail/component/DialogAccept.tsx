import { routes } from "@/routes/routes";
import paymentApiService from "@/services/API/PaymentApiService";
import { RegisterSuccess } from "@/utils/MessageToast";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Zoom,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DialogAccept({ open, id, handleClose }: any) {
  const navigate = useNavigate();

  const handleSubmitRegister = () => {
    paymentApiService
      .createPayment(Number(id), Number(0))
      .then((data: any) => {
        handleClose();
        toast.success(RegisterSuccess);

        setTimeout(() => {
          navigate(routes.Home);
        }, 4000);
      })
      .catch((error: any) => {});
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Zoom}
      transitionDuration={600}
    >
      <DialogTitle id="responsive-dialog-title">
        Xác nhận đăng kí khóa học
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn đăng kí khóa học này không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} variant="outlined">
          Không
        </Button>
        <Button onClick={handleSubmitRegister} autoFocus variant="outlined">
          Có
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogAccept;
