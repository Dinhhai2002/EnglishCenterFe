import TableCellComponent from "@/components/TableCellComponent/TableCellComponent";
import utils from "@/utils/Utils";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

function TableListPayment({ listResult, labelTable }: any) {
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
                  <TableCellComponent value={item.course_name} />
                  <TableCellComponent value={item.student_name} />
                  <TableCellComponent
                    position="right"
                    value={utils.formatMoney(item.amount)}
                  />
                  <TableCellComponent value={item.payment_date} />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableListPayment;
