import courseAdminApiService from "@/services/API/Admin/CourseAdminApiService";
import authenticationApiService from "@/services/API/AuthenticationApiService";
import utils from "@/utils/Utils";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./HomeCourseOnline.module.scss";
import ListCourseOnline from "./ListCourseOnline";

const cx = classNames.bind(styles);

function HomeCourseOnline({
  isPagination = false,
  isBanner = false,
  isUserCourse = false,
  position,
  title,
  categoryExam,
}: any) {
  const [listCourseOnline, setListCourseOnline] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const [loading, setLoading] = useState(true);

  const { isCurrentUser } = utils.getCurrentUser();

  const fetchCourseNotLogin = (
    keySearch: string,
    status: number,
    page: number,
    limit: number
  ) => {
    authenticationApiService
      .getAllCourse(keySearch, status, page, limit)
      .then((data: any) => {
        setListCourseOnline(data.data.list);
        setTotalRecord(data.data.total_record);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  };

  const fetchCourse = (
    keySearch: string,
    status: number,
    page: number,
    limit: number
  ) => {
    courseAdminApiService
      .getAll(keySearch, status, page, limit)
      .then((data: any) => {
        setListCourseOnline(data.data.list);
        setTotalRecord(data.data.total_record);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isCurrentUser === false) {
      fetchCourseNotLogin("", 1, 0, 6);
    } else {
      fetchCourse("", 1, 0, 6);
    }
  }, [isCurrentUser]);

  const onClickPagination = (
    keySearch: string = "",
    page: number,
    limit: number
  ) => {
    if (isCurrentUser === false) {
      fetchCourseNotLogin(keySearch, 1, page, limit);
    } else {
      fetchCourse(keySearch, 1, page, limit);
    }
  };

  const listCourseUser = listCourseOnline.filter(
    (x: any) => x.type_user_using === 1
  );

  return (
    <>
      <div className={cx("slider")}>
        {/* {isBanner && (
          <div className={cx("content_course")}>
            <Image
              className={cx("image")}
              src="https://firebasestorage.googleapis.com/v0/b/uploadimage-aa334.appspot.com/o/45f87ef8-26bc-428f-98ee-50880d0d78dfjpg?alt=media"
              alt="noImage"
            />
          </div>
        )} */}
      </div>
      <ListCourseOnline
        listCourseOnline={isUserCourse ? listCourseUser : listCourseOnline}
        position={position}
        title={title}
        categoryExam={categoryExam}
        onClickPagination={onClickPagination}
        isPagination={isPagination}
        totalRecord={totalRecord}
        isUserCourse={isUserCourse}
        loading={loading}
      />
    </>
  );
}

export default HomeCourseOnline;
