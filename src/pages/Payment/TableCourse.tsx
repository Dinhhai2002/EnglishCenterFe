import {
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { labelTableCourseDetail } from "@/utils/LabelUtils";

import utils from "@/utils/Utils";
import TableCellComponent from "@/components/TableCellComponent/TableCellComponent";

const TableCourse = ({ course }: any) => {
  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* map label bảng */}
              {labelTableCourseDetail.map((item: any) => (
                <TableCell align="center" key={item.id}>
                  {item.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCellComponent value={course.id} />
              <TableCellComponent value={course.name} />
              <TableCellComponent
                position="right"
                value={utils.formatMoney(
                  course.price - (course.price * course.discount_percent) / 100
                )}
              />
              <TableCellComponent value={course.count_chapter} />
              <TableCellComponent value={course.count_lessons} />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default TableCourse;
