import examApiService from "@/services/API/ExamApiService";
import topicExamApiService from "@/services/API/TopicExamApiService";

import { useEffect, useState } from "react";

import categoryExamAdminApiService from "@/services/API/Admin/CategoryExamAdminApiService";
import classNames from "classnames/bind";
import styles from "./Exam.module.scss";
import ListExam from "./ListExam";

const cx = classNames.bind(styles);

function Exam() {
  const [listCategoryExam, setListCategoryExam] = useState([]);
  const [listTopicExam, setListTopicExam] = useState([]);

  const [listExam, setListExam] = useState([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);


  useEffect(() => {
    categoryExamAdminApiService
      .getAll("", 1, 1, 10)
      .then((data: any) => {
        setListCategoryExam(data.data.list);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
      });

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
    setLoadingButton(true);
    examApiService
      .getAll(categoryId, topicId, status, keySearch, page, limit)
      .then((data: any) => {
        setListExam(data.data.list);
        setTotalRecord(data.data.total_record);
        setLoadingButton(false);
      })
      .catch((error: any) => {
        setLoadingButton(false);
      });
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
            loading={loading}
            loadingButton={loadingButton}
          />
        </div>
      </div>
    </div>
  );
}

export default Exam;
