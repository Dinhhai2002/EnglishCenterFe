import { Box, Pagination } from "@mui/material";
import { ChangeEvent } from "react";
import utils from "src/utils/Utils";
import DropDown from "../DropDown/DropDown";
const paginationArr = [
  {
    id: 10,
    name: 10,
  },
  {
    id: 20,
    name: 20,
  },
  {
    id: 30,
    name: 30,
  },
];
function PaginationComponent({ setPage, setLimit, totalRecord, limit }: any) {
  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(Number(value));
  };

  const handleChangeLimit = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setLimit(Number(event.target.value));
  };
  return (
    <>
      <Box p={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Pagination
          count={utils.getTotalPage(totalRecord, limit)}
          variant="outlined"
          color="primary"
          onChange={handleChangePagination}
        />
        <DropDown
          value={limit}
          onChange={handleChangeLimit}
          listValue={paginationArr}
          label="Số trang"
          isFullWidth={false}
        />
      </Box>
    </>
  );
}

export default PaginationComponent;
