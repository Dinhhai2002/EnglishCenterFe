import classNames from "classnames/bind";
import Tags from "../../components/Tags/Tags";
import styles from "./ExamDetail.module.scss";

import { toast } from "react-toastify";

import authenticationApiService from "@/services/API/AuthenticationApiService";
import { FunctionIsDevelopment, RequiredLogin } from "@/utils/MessageToast";
import utils from "@/utils/Utils";
import { faClock, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Comments from "../../components/Comments/NewComments";
import DialogComponent from "./DialogComponent";
import { routes } from "@/routes/routes";

const cx = classNames.bind(styles);

function ExamDetail() {
  const [value, setValue] = useState("1");
  const [exam, setExam] = useState<any>({});
  const [countComment, setCountComment] = useState(0);
  const [countUser, setCountUser] = useState(0);
  const [open, setOpen] = useState(false);

  const { isCurrentUser } = utils.getCurrentUser();
  const navigate = useNavigate();

  const { id } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    authenticationApiService
      .getDetailExam(id)
      .then((data: any) => {
        setExam(data.data);
      })
      .catch((error: any) => {
        toast.error(`${error.message}`);
      });

    authenticationApiService
      .countCommentsByExamId(Number(id))
      .then((data: any) => {
        setCountComment(data.data);
      })
      .catch((error: any) => {
        toast.error(`${error.message}`);
      });

    authenticationApiService
      .countUserExam(id)
      .then((data: any) => {
        setCountUser(data.data);
      })
      .catch((error: any) => {
        toast.error(`${error.message}`);
      });
  }, [id]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onAddComment = (data: any) => {
    authenticationApiService
      .countCommentsByExamId(Number(id))
      .then((data: any) => {
        setCountComment(data.data);
      })
      .catch((error: any) => {});
  };

  // xử lí nếu chưa login thì đẩy về lại trang login
  const handleStartExam = () => {
    if (isCurrentUser === false) {
      navigate(routes.Login);
      toast.error(`${RequiredLogin}`);
      return;
    }
    handleClickOpen();
  };

  const handleSubmitDoExam = () => {
    navigate(`/tests/${exam.id}/${exam.topic_name}/start`);
  };

  const handleTags = () => {
    toast.success(`${FunctionIsDevelopment}`);
  };

  return (
    <div className={cx("body")}>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("header-tags")}>
            {/* <Tags title="#IELTS Academic" normally />
            <Tags title="#Listening" normally /> */}
          </div>
          <h3 className={cx("exams")}>{exam.name}</h3>
          <div className={cx("header-tags")}>
            <Tags onClick={handleTags} title="Thông tin đề thi" active />
            <Tags onClick={handleTags} title="Đáp án/transcript" normally />
          </div>
          <h3 className={cx("exams")}>Bộ đề thi: {exam.topic_name}</h3>
          <div className={cx("detail")}>
            <div className={cx("item")}>
              <FontAwesomeIcon className={cx("icon")} icon={faClock} />
              <p>Thời gian làm bài: {exam.time_minutes} phút |</p>
            </div>
            <div className={cx("item")}>
              <p>7 phần thi |</p>
            </div>
            <div className={cx("item")}>
              <p>{exam.total_question} câu hỏi |</p>
            </div>
            <div className={cx("item")}>
              <p>{countComment} bình luận</p>
            </div>
          </div>
          <div className={cx("detail")}>
            <div className={cx("item")}>
              <FontAwesomeIcon className={cx("icon")} icon={faUserPen} />
              <p>{countUser} người đã luyện tập đề thi này</p>
            </div>
          </div>
          <div style={{ width: "70%" }}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChangeTab}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      sx={{ fontSize: 16 }}
                      label="Làm full Test"
                      value="1"
                    />
                    <Tab sx={{ fontSize: 16 }} label="Thảo luận" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Alert sx={{ fontSize: 16, marginBottom: 5 }} severity="info">
                    Sẵn sàng để bắt đầu làm full test? Để đạt được kết quả tốt
                    nhất, bạn cần tập trung cao độ nhất.
                  </Alert>
                  <Button
                    content="Bắt đầu thi"
                    primary
                    href={
                      `#`
                      // isCurrentUser &&
                      // `/tests/${exam.id}/${exam.topic_name}/start`
                    }
                    onClick={handleStartExam}
                  />
                  <DialogComponent
                    open={open}
                    handleClose={handleClose}
                    handleSubmit={handleSubmitDoExam}
                  />
                </TabPanel>
                <TabPanel value="2">
                  <Comments examId={exam.id} onAddComment={onAddComment} />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamDetail;
