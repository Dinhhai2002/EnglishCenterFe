import Empty from "@/components/Empty/Empty";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import authenticationApiService from "@/services/API/AuthenticationApiService";
import { Course as CourseType } from "@/types/Course";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/Constant";
import { StatusEnum } from "@/utils/enum/StatusEnum";
import { UserCourseUsingStatusEnum } from "@/utils/enum/UserCourseUsingStatusEnum";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Course from "./Course";
import CourseSkeleton from "./CourseSkeleton";
import HeaderCourse from "./HeaderCourse";
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
  isSearch = true,
}: any) {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [keySearch, setKeySearch] = useState("");
  const [listCategoryCourse, setListCategoryCourse] = useState([]);
  const [categoryCourseId, setCategoryCourseId] = useState("");
  useEffect(() => {
    authenticationApiService
      .getAllCategoryCourse("", StatusEnum.ON, PAGE_DEFAULT, LIMIT_DEFAULT * 10)
      .then((data: any) => {
        setListCategoryCourse(data.data.list);
      })
      .catch((error: any) => {});
  }, []);
  const handleSubmit = () => {
    onClickPagination(
      Number(categoryCourseId === "" ? -1 : categoryCourseId),
      keySearch,
      page,
      limit
    );
  };

  useEffect(() => {
    isPagination &&
      onClickPagination(
        Number(categoryCourseId === "" ? -1 : categoryCourseId),
        keySearch,
        page,
        limit
      );
  }, [page, limit]);

  return (
    <>
      <div className={cx("content_course")}>
        {isSearch && (
          <HeaderCourse
            position={position}
            title={title}
            isSearch={isSearch}
            setKeySearch={setKeySearch}
            loading={loading}
            handleSubmit={handleSubmit}
            listCategoryCourse={listCategoryCourse}
            categoryCourseId={categoryCourseId}
            setCategoryCourseId={setCategoryCourseId}
          />
        )}

        <div className={cx("content")}>
          <div className={cx("content-list-3")}>
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Link to={"#"} key={index} className={cx("content-item-3")}>
                  <CourseSkeleton />
                </Link>
              ))
            ) : listCourseOnline.length <= 0 ? (
              <Empty />
            ) : (
              listCourseOnline.map((item: CourseType, index: number) => (
                <Link
                  // nếu chưa đăng kí thì trả về trang chi tiết <> trang bài học đang học gần nhất
                  to={
                    item.type_user_using !==
                    UserCourseUsingStatusEnum.REGISTERED
                      ? `/course/${item.id}`
                      : `/course/${item.id}/learning/${item.lessons_present}`
                  }
                  key={index}
                  className={cx("content-item-3")}
                >
                  <Course item={item} />
                </Link>
              ))
            )}
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
