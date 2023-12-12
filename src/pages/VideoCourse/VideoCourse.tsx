import courseApiService from "@/services/API/CourseApiService";
import lessonApiService from "@/services/API/LessonApiService";
import { StudySuccess } from "@/utils/MessageToast";

import { Grid, Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Iframe from "react-iframe";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import YouTube from "react-youtube";
import "video-react/dist/video-react.css"; // import css
import ListLessons from "./ListLessons";
import ListLessonsSkeleton from "./ListLessonsSkeleton";
import styles from "./VideoCourse.module.scss";

const cx = classNames.bind(styles);

const opts = {
  width: "1100",
  height: "500",
  playerVars: {
    autoplay: 1,
  },
};

function VideoCourse() {
  // const [expanded, setExpanded] = useState<string | false>("");
  const [lessons, setLessons] = useState<any>({});
  const [course, setCourse] = useState<any>({});
  const [isSuccess, setIsSuccess] = useState(false);
  // const [isPlay, setIsPlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // isLoading để phục vụ việc không load phần danh sách bài học khi click chuyển bài

  const { id, lessonsId } = useParams();

  const startTimeRef = useRef(Date.now());
  const isPlay = useRef(true);
  const lessonsIdRef = useRef(lessonsId);

  // const handleChangeExpanded =
  //   (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
  //     setExpanded(newExpanded ? panel : false);
  //   };

  const handleUpdateView = () => {
    const timeWatched = Date.now() - startTimeRef.current;

    lessonApiService
      .updateTimeViewVideo(Number(lessonsIdRef.current), Number(timeWatched))
      .then((data) => {
        if (data.data.is_done === 1) {
          toast.success(StudySuccess);
          setIsSuccess(!isSuccess);
        }
      })
      .catch((error) => {});
  };

  useLayoutEffect(() => {
    courseApiService
      .getDetailCourse(Number(id))
      .then((data: any) => {
        setCourse(data.data);

        lessonApiService
          .getDetail(Number(lessonsId))
          .then((data: any) => {
            setLoading(false);
            setLessons(data.data);
          })
          .catch((error: any) => {
            setLoading(false);
          });
      })
      .catch((error: any) => {
        setLoading(false);
      });

    // set mỗi 5s sẽ gọi hàm để update thời gian xem của người dùng
    const interval = setInterval(async () => {
      if (Date.now() - startTimeRef.current >= 4000 && isPlay.current) {
        await handleUpdateView();
        startTimeRef.current = Date.now();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      handleUpdateView();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // để chuyển video khi bấm sang link bài khác
  useEffect(() => {
    setIsLoading(true);
    lessonApiService
      .getDetail(Number(lessonsId))
      .then((data: any) => {
        setIsLoading(false);
        setLessons(data.data);
      })
      .catch((error: any) => {
        setIsLoading(false);
      });

    // cập nhật lessonsId ref trong interval
    lessonsIdRef.current = lessonsId;
  }, [lessonsId]);

  // khi qua bài thành công thì render lại course
  useEffect(() => {
    courseApiService
      .getDetailCourse(Number(id))
      .then((data: any) => {
        setCourse(data.data);
      })
      .catch((error: any) => {});
  }, [isSuccess]);

  const onPlay = () => {
    startTimeRef.current = Date.now();
    isPlay.current = true;
  };

  const onPause = () => {
    handleUpdateView();
    isPlay.current = false;
  };
  const handleChangeNavigate = () => {
    isPlay.current = false;
    handleUpdateView();
  };

  return (
    <div className={cx("body")}>
      <div className={cx("content")}>
        <Grid container spacing={2}>
          <Grid className={cx("item-10")} item xs={10}>
            <div className={cx("video")}>
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
            </div>
            <div className={cx("description")}>
              <h3>{lessons ? lessons.name : ""}</h3>
              <p>{lessons ? lessons.description : ""} </p>
            </div>
          </Grid>
          <Grid className={cx("item-2")} item xs={2}>
            <div className={cx("item-2-content")}>
              <div className={cx("header")}>
                {loading || isLoading ? (
                  <Skeleton variant="text" height={60} sx={{ margin: 1 }} />
                ) : (
                  <h3>Nội dung khóa học</h3>
                )}
              </div>
              <div className={cx("panel")}>
                {loading ? (
                  <ListLessonsSkeleton />
                ) : (
                  <ListLessons
                    course={course}
                    handleChangeNavigate={handleChangeNavigate}
                    lessonsId={lessonsId}
                    id={id}
                  />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default VideoCourse;
