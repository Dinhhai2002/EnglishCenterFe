import Empty from "@/components/Empty/Empty";
import resultApiService from "@/services/API/ResultApiService";
import { Result } from "@/types/Result";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/Constant";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./ResultExam.module.scss";
import ResultExamItem from "./ResultExamItem";
import ResultExamItemSkeleton from "./ResultExamItemSkeleton";

const cx = classNames.bind(styles);

function ResultExam() {
  const [listResult, setListResult] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    resultApiService
      .getAll(-1, "", PAGE_DEFAULT, LIMIT_DEFAULT - 2)
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
            listResult.map((result: Result, index: number) => (
              <div key={index} className={cx("content-item-4")}>
                <ResultExamItem result={result} />
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
