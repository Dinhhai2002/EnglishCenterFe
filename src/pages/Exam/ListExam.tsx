import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import Button from "@/components/Button/Button";
import Target from "@/components/Target/Target";
import targetApiService from "@/services/API/TargetApiService";
import formatTimeUtils from "@/utils/FormatTimeUtils";
import utils from "@/utils/Utils";

import DropDown from "@/components/DropDown/DropDown";
import Empty from "@/components/Empty/Empty";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HomeNewExam from "../Home/HomeNewExam/HomeNewExam";
import DialogTarget from "./DialogTarget";
import styles from "./Exam.module.scss";
import Category from "./component/Category";
import CategorySkeleton from "./component/CategorySkeleton";
import { LoadingButton } from "@mui/lab";

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
  const [currentDate, setCurrentDate] = useState("");
  const [dateTarget, setDateTarget] = useState("");
  const [target, setTarget] = useState<any>({});
  const [point, setPoint] = useState("");
  const [isTarget, setIsTarget] = useState(false);
  const [categoryId, setCategoryId] = useState<number>(-1);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const { currentUser } = utils.getCurrentUser();

  const handleChangePoint = (event: any) => {
    const result = event.target.value.replace(/\D/g, "");

    setPoint(result);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTopic = (event: SelectChangeEvent) => {
    setTopic(event.target.value as string);
  };

  useEffect(() => {
    targetApiService
      .getByUserId()
      .then((data: any) => {
        setTarget(data.data);
        setIsTarget(true);
      })
      .catch((error: any) => {
        setIsTarget(false);
      });
  }, []);

  useEffect(() => {
    onClickPagination(categoryId, Number(topic), 1, keySearch, page, limit);
  }, [page]);

  useEffect(() => {
    onClickPagination(categoryId, Number(topic), 1, keySearch, 1, limit);
  }, [limit]);

  const handleSubmit = () => {
    console.log(123);

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

    targetApiService
      .create(formattedDate, point)
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
        <Grid container item xs={8}>
          <Grid item xs={2}>
            <Button
              onClick={() => {
                handleClickCategory(-1);
                setActive(undefined);
              }}
              block
              content={"Tất cả"}
              transparent
              active={active === undefined}
            />
          </Grid>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => <CategorySkeleton />)
            : listCategoryExam.map((item: any, index: number) => (
                <Category
                  item={item}
                  index={index}
                  handleClickCategory={handleClickCategory}
                  setActive={setActive}
                  active={active}
                />
              ))}

          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Nhập từ khóa để tìm kiếm"
              id="fullWidth"
              name="keySearch"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setKeySearch(event.target.value);
              }}
            />
          </Grid>
          <Grid sx={{ marginLeft: 2 }} item xs={3}>
            <DropDown
              value={topic}
              onChange={handleChangeTopic}
              listValue={listTopicExam}
              isValueAll={true}
              label="Bộ đề thi"
            />
          </Grid>
          <Grid sx={{ marginTop: 4 }} item xs={3}>
            <LoadingButton
              variant="outlined"
              loading={loadingButton}
              onClick={handleSubmit}
            >
              Tìm kiếm
            </LoadingButton>
          </Grid>
        </Grid>
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
              <h4>Chưa tạo mục tiêu</h4>
              <Button
                content="Tạo mục tiêu"
                primary
                onClick={handleClickOpen}
              />
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
