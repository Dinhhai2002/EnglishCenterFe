import Empty from "@/components/Empty/Empty";
import resultApiService from "@/services/API/ResultApiService";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./ResultExam.module.scss";
import ResultExamItem from "./ResultExamItem";
import ResultExamItemSkeleton from "./ResultExamItemSkeleton";

const cx = classNames.bind(styles);

function ResultExam() {
  const [listResult, setListResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    resultApiService
      .getAll(-1, "", 0, 8)
      .then((data: any) => {
        setListResult(data.data.list);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h2>Kết quả luyện thi mới nhất</h2>
      </div>
      <div className={cx("content")}>
        <div className={cx("content-list-4")}>
          {isLoading ? (
            /* Skeleton component to show loading state */
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className={cx("content-item-4")}>
                <ResultExamItemSkeleton />
              </div>
            ))
          ) : listResult.length > 0 ? (
            listResult.map((item: any, index: number) => (
              <div key={index} className={cx("content-item-4")}>
                <ResultExamItem item={item} />
              </div>
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultExam;
