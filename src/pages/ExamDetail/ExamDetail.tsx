import classNames from "classnames/bind";
import styles from "./ExamDetail.module.scss";

import { toast } from "react-toastify";

import { routes } from "@/routes/routes";
import examApiService from "@/services/API/ExamApiService";
import { FunctionIsDevelopment, RequiredLogin } from "@/utils/MessageToast";
import utils from "@/utils/Utils";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InforExam from "./InforExam";
import TabBar from "./TabBar";
import { Box, CircularProgress } from "@mui/material";
import authenticationApiService from "@/services/API/AuthenticationApiService";

const cx = classNames.bind(styles);

function ExamDetail() {
  const [value, setValue] = useState("1");
  const [exam, setExam] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
      .getDetailExam(Number(id))
      .then((data: any) => {
        setExam(data.data);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  }, [id]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onAddComment = (data: any) => {
    examApiService
      .findOne(Number(id))
      .then((data: any) => {
        setExam(data.data);
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
            <>
              <InforExam exam={exam} handleTags={handleTags} />
              <div style={{ width: "70%" }}>
                <TabBar
                  value={value}
                  handleChangeTab={handleChangeTab}
                  handleStartExam={handleStartExam}
                  open={open}
                  handleClose={handleClose}
                  handleSubmitDoExam={handleSubmitDoExam}
                  onAddComment={onAddComment}
                  exam={exam}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExamDetail;
