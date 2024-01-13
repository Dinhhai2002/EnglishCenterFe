import paymentApiService from "@/services/API/PaymentApiService";
import utils from "@/utils/Utils";
import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import TablePaymentUser from "./TablePaymentUser";

function PaymentUserHistory() {
  const [listResult, setListResult] = useState<any>([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);

  const { currentUser } = utils.getCurrentUser();

  const fetchPaymentUserHistory = (
    courseId: number,
    userId: number,
    isPagination: number,
    page: number,
    limit: number
  ) => {
    paymentApiService
      .getAll(courseId, userId, isPagination, page, limit)
      .then((data: any) => {
        setListResult(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  };

  useEffect(() => {
    fetchPaymentUserHistory(-1, currentUser.id, 1, 0, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickPagination = (page: number, limit: number) => {
    fetchPaymentUserHistory(-1, currentUser.id, 1, page, limit);
  };

  return (
    <Card>
      <TablePaymentUser
        listResult={listResult}
        totalRecord={totalRecord}
        onClickPagination={onClickPagination}
      />
    </Card>
  );
}

export default PaymentUserHistory;
