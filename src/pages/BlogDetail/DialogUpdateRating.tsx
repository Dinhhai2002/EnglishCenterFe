import CloseDialog from "@/components/CloseDialog/CloseDialog";
import ratingApiService from "@/services/API/RatingApiService";
import { Post } from "@/types/Post";
import { EditSuccess } from "@/utils/MessageToast";
import { Update } from "@mui/icons-material";
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
  update: any;
  point: number;
}

function DialogUpdateRating(props: DialogRatingProps) {
  const { post, open, handleClose, update, point } = props;
  const [value, setValue] = useState<any>(point);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleUpdateRating = async () => {
    console.log(post);
    console.log(post.rating?.id);

    const data = await ratingApiService.update(
      Number(post.rating?.id),
      post.id,
      value
    );
    update(value);
    handleClose();
    toast.success(EditSuccess);
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
        {"Cập nhật đánh giá"}
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
        <Button variant="contained" onClick={handleUpdateRating}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogUpdateRating;
