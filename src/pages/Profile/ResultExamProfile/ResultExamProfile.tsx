import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import TableResult from "./TableResult";
import resultApiService from "@/services/API/ResultApiService";

function ResultExamProfile() {
  const [listResult, setListResult] = useState<any>([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);

  const fetchResult = (page: number, limit: number) => {
    resultApiService
      .getAll(-1, "", page, limit)
      .then((data: any) => {
        setListResult(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  };

  useEffect(() => {
    fetchResult(0, 10);
  }, []);

  const onClickPagination = (page: number, limit: number) => {
    fetchResult(page, limit);
  };

  return (
    <Card>
      <TableResult
        listResult={listResult}
        totalRecord={totalRecord}
        onClickPagination={onClickPagination}
      />
    </Card>
  );
}

export default ResultExamProfile;
