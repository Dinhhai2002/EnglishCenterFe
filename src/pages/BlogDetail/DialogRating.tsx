import CloseDialog from "@/components/CloseDialog/CloseDialog";
import ratingApiService from "@/services/API/RatingApiService";
import { Post } from "@/types/Post";
import { CreateRatingSuccess } from "@/utils/MessageToast";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Rating,
  Slide,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

interface DialogRatingProps {
  post: Post;
  open: boolean;
  handleClose: any;
  handleCreateSuccess: any;
}

function DialogRating(props: DialogRatingProps) {
  const { post, open, handleClose, handleCreateSuccess } = props;
  const [value, setValue] = useState<any>(5);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleCreateRating = async () => {
    const data = await ratingApiService.create(post.id, value);
    handleCreateSuccess(post.id);
    handleClose();
    toast.success(CreateRatingSuccess);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Slide}
      transitionDuration={600}
    >
      <DialogTitle sx={{ fontSize: 16 }} id="alert-dialog-title">
        {"Đánh giá bài viết"}
      </DialogTitle>
      <CloseDialog handleCloseDialog={handleClose} />
      <Box sx={{ display: "flex", alignItems: "center", margin: 2 }}>
        <Typography variant="body2" gutterBottom mt={1}>
          Chọn số sao đánh giá :
        </Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      <DialogActions>
        <Button variant="contained" onClick={handleCreateRating}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogRating;
