import Button from "@/components/Button/Button";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Course from "./Course";
import CourseSkeleton from "./CourseSkeleton";
import styles from "./HomeCourseOnline.module.scss";

const cx = classNames.bind(styles);

function ListCourseOnline({
  listCourseOnline,
  position,
  title,
  categoryExam,
  isPagination = false,
  onClickPagination,
  totalRecord,
  loading,
}: any) {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [keySearch, setKeySearch] = useState("");

  const handleSubmit = () => {
    onClickPagination(keySearch, page, limit);
  };

  useEffect(() => {
    onClickPagination(keySearch, page, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    onClickPagination(keySearch, 1, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return (
    <>
      <div className={cx("content_course")}>
        <div className={cx("header")}>
          <h2 className={cx({ position })}>{title}</h2>
          <Grid
            sx={{
              marginTop: 4,
              display: "flex",
            }}
            item
          >
            <TextField
              sx={{ width: "80%", marginRight: 4 }}
              fullWidth
              label="Nhập từ khóa để tìm kiếm"
              id="fullWidth"
              name="keySearch"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setKeySearch(event.target.value);
              }}
            />
             <LoadingButton
              variant="contained"
              loading={loading}
              onClick={handleSubmit}
            >
              Tìm kiếm
            </LoadingButton>
          </Grid>

        </div>
        <div className={cx("content")}>
          <div className={cx("content-list-3")}>
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Link to={"#"} key={index} className={cx("content-item-3")}>
                    <CourseSkeleton />
                  </Link>
                ))
              : listCourseOnline.map((item: any, index: number) => (
                  <Link
                    // nếu chưa đăng kí thì trả về trang chi tiết <> trang bài học đang học gần nhất
                    to={
                      item.type_user_using !== 1
                        ? `/course/${item.id}`
                        : `/course/${item.id}/learning/${item.lessons_present}`
                    }
                    key={index}
                    className={cx("content-item-3")}
                  >
                    <Course item={item} />
                  </Link>
                ))}
          </div>
        </div>
      </div>
      {isPagination && listCourseOnline.length > 0 && (
        <PaginationComponent
          setPage={setPage}
          setLimit={setLimit}
          totalRecord={totalRecord}
          limit={limit}
        />
      )}
    </>
  );
}

export default ListCourseOnline;
