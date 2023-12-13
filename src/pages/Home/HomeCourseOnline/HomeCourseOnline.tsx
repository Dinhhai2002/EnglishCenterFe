import Image from "@/components/Image/Image";
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

  useEffect(() => {
    if (isCurrentUser === false) {
      authenticationApiService
        .getAllCourse("", 1, 0, 6)
        .then((data: any) => {
          setListCourseOnline(data.data.list);
          setTotalRecord(data.data.total_record);
          setLoading(false);
        })
        .catch((error: any) => {
          setLoading(false);
        });
    } else {
      courseAdminApiService
        .getAll("", 1, 0, 6)
        .then((data: any) => {
          setListCourseOnline(data.data.list);
          setTotalRecord(data.data.total_record);
          setLoading(false);
        })
        .catch((error: any) => {
          setLoading(false);
        });
    }
  }, [isCurrentUser]);

  const onClickPagination = (
    keySearch: string = "",
    page: number,
    limit: number
  ) => {
    if (isCurrentUser === false) {
      authenticationApiService
        .getAllCourse(keySearch, 1, page, limit)
        .then((data: any) => {
          setListCourseOnline(data.data.list);
          setTotalRecord(data.data.total_record);
          setLoading(false);
        })
        .catch((error: any) => {
          setLoading(false);
        });
    } else {
      courseAdminApiService
        .getAll(keySearch, 1, page, limit)
        .then((data: any) => {
          setListCourseOnline(data.data.list);
          setTotalRecord(data.data.total_record);
          setLoading(false);
        })
        .catch((error: any) => {
          setLoading(false);
        });
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
