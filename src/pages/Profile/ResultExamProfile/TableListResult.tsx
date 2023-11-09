import Button from "@/components/Button/Button";
import TableCellComponent from "@/components/TableCellComponent/TableCellComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

function TableListUser({ listResult, labelTable }: any) {
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
                  <TableCellComponent value={item.name_exam} />
                  <TableCellComponent value={item.total_question_correct} />
                  <TableCellComponent value={item.total_question_skip} />
                  <TableCellComponent value={item.total_point} />
                  <TableCellComponent value={item.time_complete} />
                  <TableCellComponent value={item.created_at} />

                  <TableCell align="center">
                    <Button
                      outline
                      content="Xem chi tiết"
                      block
                      to={`/tests/${item.exam_id}/${item.name_exam}/results/${item.id}`}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableListUser;
