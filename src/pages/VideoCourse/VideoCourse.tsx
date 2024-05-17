import courseApiService from "@/services/API/CourseApiService";
import lessonApiService from "@/services/API/LessonApiService";
import { StudySuccess } from "@/utils/MessageToast";

import { Button, Grid } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DialogCreateNote from "./component/DialogCreateNote";
import DialogViewNote from "./component/DialogViewNote";
import styles from "./VideoCourse.module.scss";
import ViewListLessons from "./component/ViewListLessons";
import ViewVideo from "./component/ViewVideo";

const cx = classNames.bind(styles);

function VideoCourse() {
  const [lessons, setLessons] = useState<any>({});
  const [course, setCourse] = useState<any>({});
  const [isSuccess, setIsSuccess] = useState(false);
  // const [isPlay, setIsPlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openViewNote, setOpenViewNote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // isLoading để phục vụ việc không load phần danh sách bài học khi click chuyển bài

  const { courseId, lessonsId } = useParams();

  const startTimeRef = useRef(Date.now());
  const isPlay = useRef(true);
  const lessonsIdRef = useRef(lessonsId);

  const handleCloseDialogCreateNote = () => {
    setOpen(false);
  };

  const handleOpenDialogCreateNote = () => {
    setOpen(true);
  };

  const handleCloseDialogViewNote = () => {
    setOpenViewNote(false);
  };

  const handleOpenDialogViewNote = () => {
    setOpenViewNote(true);
  };

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

  const fetchCourseDetail = () => {
    courseApiService
      .getDetailCourse(Number(courseId))
      .then((data: any) => {
        setCourse(data.data);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  };

  const fetchLessonsDetail = (isNotLoading: boolean = false) => {
    lessonApiService
      .getDetail(Number(lessonsId))
      .then((data: any) => {
        setLoading(false);
        setLessons(data.data);
        isNotLoading && setIsLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
        isNotLoading && setIsLoading(false);
      });
  };

  useLayoutEffect(() => {
    fetchCourseDetail();
    fetchLessonsDetail();
    /**
     * set mỗi 5s sẽ gọi hàm để update thời gian xem của người dùng
     */
    const interval = setInterval(async () => {
      if (Date.now() - startTimeRef.current >= 4000 && isPlay.current) {
        await handleUpdateView();
        await fetchCourseDetail();
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
    fetchLessonsDetail(true);

    // cập nhật lessonsId ref trong interval
    lessonsIdRef.current = lessonsId;
  }, [lessonsId]);

  // khi qua bài thành công thì render lại course
  useEffect(() => {
    fetchCourseDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <ViewVideo
                loading={loading}
                isLoading={isLoading}
                lessons={lessons}
                startTimeRef={startTimeRef}
                isPlay={isPlay}
                handleUpdateView={handleUpdateView}
              />
            </div>
            <Grid sx={{ display: "flex", justifyContent: "end" }} item xs={12}>
              <Button
                onClick={handleOpenDialogViewNote}
                sx={{ margin: 2 }}
                variant="contained"
              >
                Xem ghi chú
              </Button>

              <Button
                onClick={handleOpenDialogCreateNote}
                sx={{ margin: 2 }}
                variant="contained"
              >
                Thêm ghi chú
              </Button>
            </Grid>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Grid item xs={6}>
                <h3>{lessons ? lessons.name : ""}</h3>
                <p>{lessons ? lessons.description : ""} </p>
              </Grid>
            </Grid>

            <DialogCreateNote
              open={open}
              handleCloseDialog={handleCloseDialogCreateNote}
              lessonsId={lessons.id}
              chapterId={lessons.chapter_id}
              courseId={lessons.course_id}
            />
            <DialogViewNote
              openViewNote={openViewNote}
              handleCloseDialogViewNote={handleCloseDialogViewNote}
            />
          </Grid>
          <ViewListLessons
            loading={loading}
            isLoading={isLoading}
            course={course}
            handleChangeNavigate={handleChangeNavigate}
            lessonsId={lessonsId}
            courseId={courseId}
          />
        </Grid>
      </div>
    </div>
  );
}

export default VideoCourse;
