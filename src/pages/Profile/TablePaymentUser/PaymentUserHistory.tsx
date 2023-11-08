import paymentApiService from "@/services/API/PaymentApiService";
import utils from "@/utils/Utils";
import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import TablePaymentUser from "./TablePaymentUser";

function PaymentUserHistory() {
  const [listResult, setListResult] = useState<any>([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);

  const { currentUser } = utils.getCurrentUser();

  useEffect(() => {
    paymentApiService
      .getAll(-1, currentUser.id, 1, 0, 10)
      .then((data: any) => {
        setListResult(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  }, []);

  const onClickPagination = (page: number, limit: number) => {
    paymentApiService
      .getAll(-1, currentUser.id, 1, page, limit)
      .then((data: any) => {
        setListResult(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
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
