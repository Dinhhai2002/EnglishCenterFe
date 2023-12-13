import authenticationApiService from "@/services/API/AuthenticationApiService";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { useLayoutEffect, useState } from "react";
import Iframe from "react-iframe";
import YouTube from "react-youtube";

const opts = {
  width: "1200",
  height: "500",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

function DialogVideo({ openDialogMapVideo, id, handleCloseVideo }: any) {
  const [lessons, setLessons] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    authenticationApiService
      .findOneLessons(Number(id))
      .then((data: any) => {
        setLessons(data.data);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  }, []);

  return (
    <Dialog
      fullScreen={true}
      open={openDialogMapVideo[id] || false}
      onClose={() => {
        handleCloseVideo(id);
      }}
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Slide}
      transitionDuration={600}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DialogTitle
            sx={{ fontWeight: 600, fontSize: 20 }}
            id="responsive-dialog-title"
          >
            Video bài học
          </DialogTitle>

          <DialogContent>
            {lessons.video_type === 0 ? (
              <YouTube videoId={lessons.id_video} opts={opts} />
            ) : (
              <Iframe
                url={`https://drive.google.com/file/d/${lessons.id_video}/preview`}
                width="1200"
                height="500"
                id=""
                className=""
                display="block"
                position="relative"
              />
            )}

            <Box sx={{ mt: 2 }}>
              <Typography>Tên bài học: {lessons.name}</Typography>
              <Typography sx={{ mt: 2 }} variant="h6">
                Mô tả
              </Typography>
              <Typography>{lessons.description}</Typography>
              <Typography sx={{ mt: 2 }} variant="h6">
                Nội dung
              </Typography>
              <Typography>{lessons.content}</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                handleCloseVideo(id);
              }}
              variant="outlined"
            >
              Thoát
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default DialogVideo;
