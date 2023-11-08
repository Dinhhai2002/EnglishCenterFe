import Empty from "@/components/Empty/Empty";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

import PaginationComponent from "src/components/Pagination/PaginationComponent";
import TableListResult from "./TableListResult";
import { labelTableResult } from "@/utils/LabelUtils";

const TableResult = ({ listResult, totalRecord, onClickPagination }: any) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(Number(value));
  };

  const handleChangeLimit = (event: ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(event.target.value));
  };

  useEffect(() => {
    onClickPagination(page, limit);
  }, [page]);

  useEffect(() => {
    onClickPagination(1, limit);
  }, [limit]);

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
      <TableListResult listResult={listResult} labelTable={labelTableResult} />
      {listResult.length > 0 ? (
        <PaginationComponent
          handleChangePagination={handleChangePagination}
          handleChangeLimit={handleChangeLimit}
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

export default TableResult;
