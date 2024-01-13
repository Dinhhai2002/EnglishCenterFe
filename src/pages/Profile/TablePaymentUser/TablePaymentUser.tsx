import Empty from "@/components/Empty/Empty";
import { Box, Card, CardHeader, Divider } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

import { labelTablePaymentHistory } from "@/utils/LabelUtils";
import PaginationComponent from "src/components/Pagination/PaginationComponent";
import TableListResult from "./TableListPayment";

const TablePaymentUser = ({
  listResult,
  totalRecord,
  onClickPagination,
}: any) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    onClickPagination(page, limit);
  }, [page, limit]);

  return (
    <Card>
      <CardHeader
        action={
          <Box
            width={600}
            sx={{ display: "flex", justifyContent: "space-between" }}
          ></Box>
        }
        title="Danh sách kết quả"
      />

      <Divider />
      <TableListResult
        listResult={listResult}
        labelTable={labelTablePaymentHistory}
      />
      {listResult.length > 0 ? (
        <PaginationComponent
          setPage={setPage}
          setLimit={setLimit}
          totalRecord={totalRecord}
          limit={limit}
        />
      ) : (
        <Box p={2} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Empty />
        </Box>
      )}
    </Card>
  );
};

export default TablePaymentUser;
