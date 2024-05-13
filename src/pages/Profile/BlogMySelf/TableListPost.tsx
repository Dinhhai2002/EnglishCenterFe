import Button from "@/components/Button/Button";
import IconActions from "@/components/IconActions/IconActions";
import TableCellComponent from "@/components/TableCellComponent/TableCellComponent";
import { StatusPostEnum } from "@/utils/enum/StatusPostEnum";
import { getStatusLabelBlog } from "@/utils/LabelUtils";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import DialogEdit from "./DialogEdit";

function TableListPost({
  listResult,
  labelTable,
  handleClickOpenEdit,
  openDialogMapEdit,
  handleCloseEdit,
  onClickPagination,
}: any) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* map label bảng */}
              {labelTable.map((item: any) => (
                <TableCell align="center" key={item.id}>
                  {item.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listResult.map((item: any) => {
              return (
                <TableRow hover key={item.id}>
                  <TableCellComponent value={item.id} />
                  <TableCellComponent value={item.title} />
                  <TableCell component="th" scope="row" align="center">
                    {getStatusLabelBlog(
                      item.status,
                      "Hoạt động",
                      "Tạm khóa",
                      "Chờ duyệt"
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={"Chỉnh sửa"} arrow>
                      <IconButton
                        color="inherit"
                        size="small"
                        onClick={() => {
                          handleClickOpenEdit(item.id);
                        }}
                        disabled={
                          item.status == StatusPostEnum.PENDING ? false : true
                        }
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      outline
                      content="Xem chi tiết"
                      block
                      to={`/blog/${item.id}`}
                    />
                  </TableCell>
                  <DialogEdit
                    openDialogMapEdit={openDialogMapEdit}
                    id={item.id}
                    handleCloseEdit={handleCloseEdit}
                    onClickPagination={onClickPagination}
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableListPost;
