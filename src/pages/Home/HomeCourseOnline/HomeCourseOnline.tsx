import courseAdminApiService from "@/services/API/Admin/CourseAdminApiService";
import authenticationApiService from "@/services/API/AuthenticationApiService";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/Constant";
import { StatusEnum } from "@/utils/enum/StatusEnum";
import { UserCourseUsingStatusEnum } from "@/utils/enum/UserCourseUsingStatusEnum";
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
  isSearch = true,
}: any) {
  const [listCourseOnline, setListCourseOnline] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const [loading, setLoading] = useState(true);

  const { isCurrentUser } = utils.getCurrentUser();

  const fetchCourseNotLogin = (
    categoryCourseId: number,
    keySearch: string,
    status: number,
    page: number,
    limit: number
  ) => {
    authenticationApiService
      .getAllCourse(categoryCourseId, keySearch, status, page, limit)
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
    categoryCourseId: number,
    keySearch: string,
    status: number,
    page: number,
    limit: number
  ) => {
    courseAdminApiService
      .getAll(categoryCourseId, keySearch, status, page, limit)
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
      fetchCourseNotLogin(
        -1,
        "",
        StatusEnum.ON,
        PAGE_DEFAULT,
        isSearch ? LIMIT_DEFAULT : LIMIT_DEFAULT - 4
      );
    } else {
      fetchCourse(
        -1,
        "",
        StatusEnum.ON,
        PAGE_DEFAULT,
        isSearch ? LIMIT_DEFAULT : LIMIT_DEFAULT - 4
      );
    }
  }, [isCurrentUser]);

  const onClickPagination = (
    categoryCourseId: number,
    keySearch: string = "",
    page: number,
    limit: number
  ) => {
    if (isCurrentUser === false) {
      fetchCourseNotLogin(
        categoryCourseId,
        keySearch,
        StatusEnum.ON,
        page,
        limit
      );
    } else {
      fetchCourse(categoryCourseId, keySearch, StatusEnum.ON, page, limit);
    }
  };

  const listCourseUser = listCourseOnline.filter(
    (x: any) => x.type_user_using === UserCourseUsingStatusEnum.REGISTERED
  );

  return (
    <>
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
        isSearch={isSearch}
      />
    </>
  );
}

export default HomeCourseOnline;
