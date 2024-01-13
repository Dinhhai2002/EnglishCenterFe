import { Box, CircularProgress, Grid, Tab } from "@mui/material";

import { useCountdown } from "@/components/CountDownTime/CountDownTime";
import examApiService from "@/services/API/ExamApiService";
import resultApiService from "@/services/API/ResultApiService";
import formatTimeUtils from "@/utils/FormatTimeUtils";
import { listTabPart } from "@/utils/LabelUtils";
import { TabContext, TabList } from "@mui/lab";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AnswerUser from "./AnswerUser";
import DialogComponent from "./DialogComponent";
import styles from "./DoExamOnline.module.scss";
import ViewQuestion from "./ViewQuestion";

const cx = classNames.bind(styles);

function DoExamOnline() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listId, setListId] = useState<number[]>([]);
  const [value, setValue] = useState("1");
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});

  const [listQuestion, setListQuestion] = useState<any[]>([]);
  const [exam, setExam] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setIsCounting(!isCounting);
  };

  const handleClose = () => {
    setOpen(false);
    setIsCounting(!isCounting);
  };

  useEffect(() => {
    setShowDialog(true);
  }, [selectedAnswers]);

  const handleButtonClickNext = () => {
    setValue((prevValue) => JSON.stringify(Number(prevValue) + 1));
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleRadioChange = (
    questionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const questionIndexInList = listId.includes(questionIndex);

      if (!questionIndexInList) {
        setListId((prevListId) => [...prevListId, questionIndex]);
      }

      // Update the selectedAnswers state
      return {
        ...prevSelectedAnswers,
        [questionIndex]: event.target.value,
      };
    });
  };

  useEffect(() => {
    examApiService
      .findOne(Number(id))
      .then((data: any) => {
        setLoading(false);
        setExam(data.data);
        setListQuestion(data.data.questions);
      })
      .catch((error: any) => {
        setLoading(false);
      });

    // const handleBeforeReload = (e: BeforeUnloadEvent) => {
    //   e.preventDefault();
    //   return window.confirm("test");
    // };
    // window.removeEventListener("beforeunload", handleBeforeReload);
    // return () => {
    //   window.addEventListener("beforeunload", handleBeforeReload);
    // };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listValue: any = Object.entries(selectedAnswers).map(([id, key]) => ({
    id: Number(id) + 1,
    key,
  }));
  const initialTime = 120 * 60 * 1000;
  const { minutes, seconds, isCounting, setIsCounting } =
    useCountdown(initialTime);

  const handleSubmit = () => {
    setLoadingButton(true);
    // custom lai time để truyền api
    let timeComplete: string = formatTimeUtils.customTimerCompleteExam(
      seconds > 0 ? 119 - minutes : 120 - minutes,
      seconds > 0 ? 60 - seconds : 0
    );
    // lấy số câu hỏi người dùng bỏ qua không làm
    let totalQuestionSkip: number = 200 - listValue.length;

    resultApiService
      .create(id, timeComplete, listValue, totalQuestionSkip)
      .then((data: any) => {
        navigate(`/tests/${id}/${exam.topic_name}/results/${data.data.id}`);
        setLoadingButton(false);
      })
      .catch((error: any) => {
        setLoadingButton(false);
      });
  };

  /***
   * Nếu còn 1 phút thì thông báo
   */
  if (minutes === 1 && seconds === 0) {
    toast.info(
      `Còn 1 phút là hết giờ làm bài.Hệ Thống sẽ tự động nộp bài khi hết thời gian!`
    );
  }

  // hết thời gian thì tự động submit
  if (minutes === 0 && seconds === 0) {
    handleSubmit();
  }

  return (
    <div className={cx("body")}>
      {/* <Prompt message="Are you sure you want to leave?" /> */}
      {/* <ReactRouterPrompt
        when={showDialog}
        beforeConfirm={async () => {
        }}
        // beforeCancel={() => delayPromise()}
      >
        {({ isActive, onConfirm, onCancel }) => (
          <DialogComponentBlock
            showDialog={isActive}
            confirmNavigation={onConfirm}
            cancelNavigation={onCancel}
          />
        )}
      </ReactRouterPrompt> */}
      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("content_header")}>
            <h2>{exam.name}</h2>
            <h2>Bộ đề thi: {exam.topic_name}</h2>
          </div>
          <div className={cx("content_content")}>
            <Grid
              component="form"
              onSubmit={handleSubmit}
              noValidate
              container
              spacing={2}
            >
              {loading ? (
                <Grid
                  className={cx("content_left")}
                  item
                  xs={9}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Grid>
              ) : (
                <Grid className={cx("content_left")} item xs={9}>
                  {/* <ReactAudioPlayer
                    className={cx("audio")}
                    // src={`https://drive.google.com/uc?export=download&id=${exam.url_audio}`}
                    src={`https://drive.google.com/file/d/${exam.url_audio}/preview`}
                    controls
                  /> */}
                  <iframe
                    title="audio-player"
                    width="100%"
                    height="50"
                    frameBorder="0"
                    scrolling="no"
                    src={`https://drive.google.com/file/d/${exam.url_audio}/preview`}
                  ></iframe>

                  <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          onChange={handleChangeTab}
                          aria-label="lab API tabs example"
                        >
                          {listTabPart.map((item: any, index: any) => (
                            <Tab
                              key={index}
                              label={item.label}
                              value={item.value}
                            />
                          ))}
                        </TabList>
                      </Box>
                      <ViewQuestion
                        listQuestion={listQuestion}
                        selectedAnswers={selectedAnswers}
                        handleRadioChange={handleRadioChange}
                        handleButtonClickNext={handleButtonClickNext}
                      />
                    </TabContext>
                  </Box>
                </Grid>
              )}

              <Grid
                sx={{ marginLeft: 4 }}
                className={cx("content_right")}
                item
                xs={2.5}
              >
                {loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <AnswerUser
                    minutes={minutes}
                    seconds={seconds}
                    handleClickOpen={handleClickOpen}
                    listId={listId}
                  />
                )}

                <DialogComponent
                  loading={loadingButton}
                  open={open}
                  handleClose={handleClose}
                  handleSubmit={handleSubmit}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoExamOnline;
