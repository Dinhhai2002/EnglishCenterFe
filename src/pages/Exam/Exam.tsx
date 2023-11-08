import categoryExamApiService from "@/services/API/CategoryExamApiService";
import examApiService from "@/services/API/ExamApiService";
import topicExamApiService from "@/services/API/TopicExamApiService";
import { createTheme, ThemeProvider } from "@mui/material";

import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./Exam.module.scss";
import ListExam from "./ListExam";
import categoryExamAdminApiService from "@/services/API/Admin/CategoryExamAdminApiService";

const cx = classNames.bind(styles);
// const theme = createTheme({
//   typography: {
//     htmlFontSize: 10,
//   },
// });
function Exam() {
  const [listCategoryExam, setListCategoryExam] = useState([]);
  const [listTopicExam, setListTopicExam] = useState([]);

  const [listExam, setListExam] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);

  useEffect(() => {
    categoryExamAdminApiService
      .getAll("", 1, 1, 10)
      .then((data: any) => {
        setListCategoryExam(data.data.list);
      })
      .catch((error: any) => {});

    topicExamApiService
      .getAll()
      .then((data: any) => {
        setListTopicExam(data.data);
      })
      .catch((error: any) => {});

    examApiService
      .getAll(-1, -1, 1, "", 0, 20)
      .then((data: any) => {
        setListExam(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  }, []);

  const onClickPagination = (
    categoryId: number,
    topicId: number,
    status: number,
    keySearch: string,
    page: number,
    limit: number
  ) => {
    examApiService
      .getAll(categoryId, topicId, status, keySearch, page, limit)
      .then((data: any) => {
        setListExam(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  };

  return (
    <div className={cx("body")}>
        <div className={cx("container")}>
          <div className={cx("content")}>
            <h2>Thư viện đề thi</h2>
            <ListExam
              listCategoryExam={listCategoryExam}
              listTopicExam={listTopicExam}
              listExam={listExam}
              totalRecord={totalRecord}
              onClickPagination={onClickPagination}
            />
          </div>
        </div>
    </div>
  );
}

export default Exam;
