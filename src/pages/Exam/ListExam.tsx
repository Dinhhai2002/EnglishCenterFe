import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SelectChangeEvent } from "@mui/material/Select";

import targetApiService from "@/services/API/TargetApiService";
import utils from "@/utils/Utils";

import PaginationComponent from "@/components/Pagination/PaginationComponent";
import classNames from "classnames/bind";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeNewExam from "../Home/HomeNewExam/HomeNewExam";
import SearchExam from "./component/SearchExam";
import TargetPaper from "./component/TargetPaper";
import styles from "./Exam.module.scss";

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
  const [target, setTarget] = useState<any>({});
  const [isTarget, setIsTarget] = useState(false);
  const [categoryId, setCategoryId] = useState<number>(-1);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const navigate = useNavigate();
  const { currentUser, isCurrentUser } = utils.getCurrentUser();

  const handleChangeTopic = (event: SelectChangeEvent) => {
    setTopic(event.target.value as string);
  };

  useLayoutEffect(() => {
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
  }, [page, limit]);

  const handleSubmit = () => {
    onClickPagination(categoryId, Number(topic), 1, keySearch, page, limit);
  };

  const handleClickCategory = (id: number) => {
    setCategoryId(id);
    onClickPagination(id, Number(topic), 1, keySearch, page, limit);
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
            <TargetPaper
              target={target}
              isTarget={true}
              username={currentUser ? currentUser.user_name : ""}
              urlAvatar={currentUser ? currentUser.avatar_url : ""}
            />
          ) : (
            <TargetPaper
              target={target}
              isTarget={false}
              username={currentUser ? currentUser.user_name : ""}
              urlAvatar={currentUser ? currentUser.avatar_url : ""}
            />
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

      {/* <DialogTarget
        open={open}
        handleClose={handleClose}
        setCurrentDate={setCurrentDate}
        point={point}
        handleChangePoint={handleChangePoint}
        handleSubmitTarget={handleSubmitTarget}
      /> */}
    </Box>
  );
}
