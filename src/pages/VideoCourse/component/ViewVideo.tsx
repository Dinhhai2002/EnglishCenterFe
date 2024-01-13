import { Skeleton } from "@mui/material";
import Iframe from "react-iframe";
import YouTube from "react-youtube";

const opts = {
  width: "1100",
  height: "500",
  playerVars: {
    autoplay: 1,
  },
};

function ViewVideo({
  loading,
  isLoading,
  lessons,
  startTimeRef,
  isPlay,
  handleUpdateView,
}: any) {
  const onPlay = () => {
    startTimeRef.current = Date.now();
    isPlay.current = true;
  };

  const onPause = () => {
    handleUpdateView();
    isPlay.current = false;
  };

  return (
    <>
      {loading || isLoading ? (
        <Skeleton variant="rectangular" height={500} />
      ) : lessons.video_type === 0 ? (
        <YouTube
          videoId={lessons.id_video}
          opts={opts}
          onReady={onPlay}
          onPlay={onPlay}
          onPause={onPause}
          onEnd={onPause}
        />
      ) : (
        <Iframe
          // url={`https://drive.google.com/uc?id=${lessons.id_video}`}
          url={`https://drive.google.com/file/d/${lessons.id_video}/preview?t=5s`}
          width="100%"
          height="500"
          id="videoIframe"
          className=""
          display="block"
          allowFullScreen={true}
          position="relative"
        />
      )}
    </>
  );
}

export default ViewVideo;
