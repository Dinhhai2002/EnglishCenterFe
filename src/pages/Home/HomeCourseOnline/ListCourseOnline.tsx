import { HtmlTooltip } from "@/components/CustomMui/CustomMui";
import { Chip, Typography } from "@mui/material";
import classNames from "classnames/bind";
import { ChangeEvent, useEffect, useState } from "react";
import TagIcon from "@mui/icons-material/Tag";
import { Link } from "react-router-dom";
import styles from "./HomeCourseOnline.module.scss";
import { getStatusLabelCourse } from "@/utils/LabelUtils";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import utils from "@/utils/Utils";
import Empty from "@/components/Empty/Empty";

const cx = classNames.bind(styles);

function ListCourseOnline({
  listCourseOnline,
  position,
  title,
  categoryExam,
  isPagination = false,
  onClickPagination,
  totalRecord,
}: any) {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(Number(value));
  };

  const handleChangeLimit = (event: ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(event.target.value));
  };

  useEffect(() => {
    onClickPagination(page, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    onClickPagination(1, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);
  console.log(listCourseOnline);

  return (
    <>
      <div className={cx("content_course")}>
        <div className={cx("header")}>
          <h2 className={cx({ position })}>{title}</h2>
          <h2 className={cx({ position })}>{categoryExam}</h2>
        </div>
        <div className={cx("content")}>
          <div className={cx("content-list-3")}>
            {listCourseOnline.length > 0 ? (
              listCourseOnline.map((item: any, index: number) => (
                <Link
                  // nếu chưa đăng kí thì trả về trang chi tiết <> trang bài học và id bài học đầu tiên
                  to={
                    item.type_user_using !== 1
                      ? `/course/${item.id}`
                      : `/course/${item.id}/learning/${
                          item.listChapterResponses[0]
                            ? item.listChapterResponses[0].lessonsResponses[0]
                              ? item.listChapterResponses[0].lessonsResponses[0]
                                  .id
                              : 1
                            : 1
                        }`
                  }
                  key={index}
                  className={cx("content-item-3")}
                >
                  <img src={item.banner} alt="error" />
                  <HtmlTooltip
                    placement="top"
                    title={
                      <>
                        <Typography color="inherit">Mô tả khóa học</Typography>
                        {item.description}
                      </>
                    }
                  >
                    <span className={cx("description")}>
                      {item.description ? item.description : "Không có mô tả!"}
                    </span>
                  </HtmlTooltip>

                  <Chip
                    sx={{ margin: 2 }}
                    variant="outlined"
                    color="primary"
                    icon={<TagIcon />}
                    label="khóa học online"
                  />

                  <Chip
                    sx={{ margin: 2 }}
                    variant="outlined"
                    color={item.is_free === 1 ? "info" : "error"}
                    icon={<TagIcon />}
                    label={item.is_free === 1 ? "Miễn phí" : "Có phí"}
                  />

                  <Typography>{item.name}</Typography>
                  {/* <button type="submit">#Khóa học online</button> */}
                  <div className={cx("price")}>
                    <p className={cx("sale")}>
                      {utils.formatMoney(
                        item.price - (item.price * item.discount_percent) / 100
                      )}
                      đ
                    </p>
                    <p className={cx("initial")}>
                      {item.discount_percent > 0 &&
                        utils.formatMoney(item.price) + "đ"}
                    </p>
                  </div>
                  <div className={cx("label")}>
                    {getStatusLabelCourse(
                      item.type_user_using ? item.type_user_using : 0
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
      {isPagination && listCourseOnline.length > 0 && (
        <PaginationComponent
          handleChangePagination={handleChangePagination}
          handleChangeLimit={handleChangeLimit}
          totalRecord={totalRecord}
          limit={limit}
        />
      )}
    </>
  );
}

export default ListCourseOnline;
