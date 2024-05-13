import Empty from "@/components/Empty/Empty";
import { Box, Card, CardHeader, Divider } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

import { labelTablePaymentHistory, labelTablePost } from "@/utils/LabelUtils";
import PaginationComponent from "src/components/Pagination/PaginationComponent";
import TableListResult from "./TableListPost";
import TableListPost from "./TableListPost";

const TablePost = ({ listResult, totalRecord, onClickPagination }: any) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [openDialogMapEdit, setOpenDialogMapEdit] = useState({});

  useEffect(() => {
    onClickPagination(page, limit);
  }, [page, limit]);

  const handleClickOpenEdit = (id: number) => {
    setOpenDialogMapEdit((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleCloseEdit = (id: number) => {
    setOpenDialogMapEdit((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  return (
    <Card>
      <CardHeader
        action={
          <Box
            width={600}
            sx={{ display: "flex", justifyContent: "space-between" }}
          ></Box>
        }
        title="Danh sách blog của tôi"
      />

      <Divider />
      <TableListPost
        listResult={listResult}
        labelTable={labelTablePost}
        handleClickOpenEdit={handleClickOpenEdit}
        openDialogMapEdit={openDialogMapEdit}
        handleCloseEdit={handleCloseEdit}
        onClickPagination={onClickPagination}
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

export default TablePost;
