import postApiService from "@/services/API/PostApiService";
import { Post } from "@/types/Post";
import utils from "@/utils/Utils";
import { Alert, Box, Button, Rating, Typography } from "@mui/material";
import { useState } from "react";
import DialogRating from "./DialogRating";
import DialogUpdateRating from "./DialogUpdateRating";

interface RatingProps {
  post: Post;
  setPost: any;
}

function RatingComponent(props: RatingProps) {
  const { post, setPost } = props;

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const { isCurrentUser } = utils.getCurrentUser();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const fetchPost = (id: number) => {
    postApiService
      .findOne(Number(id))
      .then((data: any) => {
        setPost(data.data);
      })
      .catch((error: any) => {});
  };
  const update = (value: number) => {
    post.rating.point = value;
    fetchPost(post.id);
  };

  const handleCreateSuccess = (id: number) => {
    fetchPost(post.id);
  };
  console.log(post);

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isCurrentUser && (
          <>
            <Typography variant="body2" gutterBottom mt={1}>
              Đánh giá bài viết :
            </Typography>
            {post.is_rating == 1 ? (
              <>
                <Rating
                  readOnly
                  name="simple-controlled"
                  value={post.rating?.point}
                />
                <Button
                  onClick={handleClickOpenUpdate}
                  sx={{ marginLeft: 1 }}
                  variant="contained"
                >
                  update
                </Button>
              </>
            ) : (
              <Button
                onClick={handleClickOpen}
                sx={{ marginLeft: 1 }}
                variant="contained"
              >
                Nhấn để đánh giá
              </Button>
            )}
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body2" gutterBottom mt={1}>
          Số đánh giá trung bình :
        </Typography>
        <Rating
          precision={0.1}
          name="simple-controlled"
          value={utils.roundNumber(post.point_avg, 1)}
          readOnly
        />
      </Box>
      <Typography variant="body2" gutterBottom mt={1}>
        Tổng số lượt đánh giá : <strong>{post.count_rating}</strong>
      </Typography>
      <Alert severity="info">
        Chú ý : số sao tương ứng với số điểm mà tác giả bài viết có thể nhận
        được và tích lũy vào điểm để quy đổi vé khuyến mãi.
      </Alert>

      <DialogRating
        open={open}
        handleClose={handleClose}
        post={post}
        handleCreateSuccess={handleCreateSuccess}
      />
      <DialogUpdateRating
        open={openUpdate}
        handleClose={handleCloseUpdate}
        post={post}
        update={update}
        point={post.rating?.point}
      />
    </Box>
  );
}

export default RatingComponent;
