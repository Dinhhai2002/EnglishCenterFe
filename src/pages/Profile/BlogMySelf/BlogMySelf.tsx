import authenticationApiService from "@/services/API/AuthenticationApiService";
import paymentApiService from "@/services/API/PaymentApiService";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/Constant";
import { StatusPostEnum } from "@/utils/enum/StatusPostEnum";
import utils from "@/utils/Utils";
import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import TableListPost from "./TableListPost";
import TablePost from "./TablePost";
import TablePaymentUser from "./TablePost";

function BlogMySelf() {
  const [listResult, setListResult] = useState<any>([]);
  const [totalRecord, setTotalRecord] = useState<any>(0);

  const { currentUser } = utils.getCurrentUser();

  const fetchPost = (page: number, limit: number) => {
    authenticationApiService
      .getAllPost(currentUser.id, -1, "", StatusPostEnum.All, page, limit)
      .then((data: any) => {
        setListResult(data.data.list);
        setTotalRecord(data.data.total_record);
      })
      .catch((error: any) => {});
  };

  useEffect(() => {
    fetchPost(PAGE_DEFAULT, LIMIT_DEFAULT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickPagination = (page: number, limit: number) => {
    fetchPost(page, limit);
  };

  return (
    <Card>
      <TablePost
        listResult={listResult}
        totalRecord={totalRecord}
        onClickPagination={onClickPagination}
      />
    </Card>
  );
}

export default BlogMySelf;
