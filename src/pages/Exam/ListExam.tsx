import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SelectChangeEvent } from "@mui/material/Select";

import Target from "@/components/Target/Target";
import targetApiService from "@/services/API/TargetApiService";
import formatTimeUtils from "@/utils/FormatTimeUtils";
import utils from "@/utils/Utils";

import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { routes } from "@/routes/routes";
import { RequiredLogin } from "@/utils/MessageToast";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HomeNewExam from "../Home/HomeNewExam/HomeNewExam";
import SearchExam from "./component/SearchExam";
import DialogTarget from "./DialogTarget";
import styles from "./Exam.module.scss";
import { Button } from "@mui/material";

const cx = classNames.bind(styles);

export default function ListExam({
  listCategoryExam,
  listTopicExam,
  listExam,
  totalRecord,
  onClickPagination,
  loading,
  loadingButton,
}: any) {
  const [active, setActive] = useState();
  const [topic, setTopic] = useState("-1");
  const [keySearch, setKeySearch] = useState("");
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateTarget, setDateTarget] = useState("");
  const [target, setTarget] = useState<any>({});
  const [point, setPoint] = useState("");
  const [isTarget, setIsTarget] = useState(false);
  const [categoryId, setCategoryId] = useState<number>(-1);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const navigate = useNavigate();
  const { currentUser, isCurrentUser } = utils.getCurrentUser();

  const handleChangePoint = (event: any) => {
    const result = event.target.value.replace(/\D/g, "");

    setPoint(result);
  };

  const handleClickOpen = () => {
    if (!isCurrentUser) {
      navigate(routes.Login);
      toast.error(`${RequiredLogin}`);
      return;
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTopic = (event: SelectChangeEvent) => {
    setTopic(event.target.value as string);
  };

  useEffect(() => {
    currentUser &&
      targetApiService
        .getByUserId()
        .then((data: any) => {
          setTarget(data.data);
          setIsTarget(true);
        })
        .catch((error: any) => {
          setIsTarget(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onClickPagination(categoryId, Number(topic), 1, keySearch, page, limit);
  }, [page]);

  useEffect(() => {
    onClickPagination(categoryId, Number(topic), 1, keySearch, 1, limit);
  }, [limit]);

  const handleSubmit = () => {
    onClickPagination(categoryId, Number(topic), 1, keySearch, page, limit);
  };

  const handleClickCategory = (id: number) => {
    setCategoryId(id);
    onClickPagination(id, Number(topic), 1, keySearch, page, limit);
  };

  let daysDiff: any = 0;
  // xử lí số ngày còn lại
  if (isTarget) {
    daysDiff = formatTimeUtils.calculateDateTarget(dateTarget);
  }

  const formattedDate = currentDate
    ? dayjs(currentDate).format("DD/MM/YYYY")
    : dateTarget;

  const handleSubmitTarget = () => {
    const validateDate: any =
      formatTimeUtils.calculateDateTarget(formattedDate);

    if (validateDate < 0) {
      toast.error(`Ngày nhập vào phải lớn hơn ngày hiện tại`);
      return;
    }
    if (Number(point) > 990) {
      toast.error(`Số điểm tối đa là 990`);
      return;
    }

    targetApiService
      .create(formattedDate, Number(point))
      .then((data: any) => {
        setTarget(data.data);
        setPoint(target.point_target);
        setIsTarget(true);
        handleClose();
      })
      .catch((error: any) => {});
  };

  return (
    <Box sx={{ width: "100%", marginTop: 4, marginBottom: 5 }}>
      <Grid container spacing={2}>
        <SearchExam
          handleClickCategory={handleClickCategory}
          setActive={setActive}
          active={active}
          loading={loading}
          listCategoryExam={listCategoryExam}
          setKeySearch={setKeySearch}
          topic={topic}
          handleChangeTopic={handleChangeTopic}
          listTopicExam={listTopicExam}
          loadingButton={loadingButton}
          handleSubmit={handleSubmit}
        />
        <Grid item xs>
          {currentUser && isTarget ? (
            <Target
              username={currentUser ? currentUser.user_name : ""}
              url={currentUser ? currentUser.avatar_url : ""}
              countDay={daysDiff}
              Date={dateTarget}
              point={point}
              CategoryNameExam="TOEIC"
            />
          ) : (
            <div className={cx("btn-target")}>
              <h4>Chưa có mục tiêu</h4>
              <Button
                sx={{ marginTop: 1 }}
                variant="contained"
                onClick={handleClickOpen}
              >
                Tạo mục tiêu
              </Button>
            </div>
          )}
        </Grid>
      </Grid>

      <div style={{ width: "100%" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <HomeNewExam listExam={listExam} isLoading={loadingButton} />
          </Box>
        </Box>
      </div>
      {listExam.length > 0 ? (
        <PaginationComponent
          setPage={setPage}
          setLimit={setLimit}
          totalRecord={totalRecord}
          limit={limit}
        />
      ) : (
        <></>
      )}

      <DialogTarget
        open={open}
        handleClose={handleClose}
        setCurrentDate={setCurrentDate}
        point={point}
        handleChangePoint={handleChangePoint}
        handleSubmitTarget={handleSubmitTarget}
      />
    </Box>
  );
}
