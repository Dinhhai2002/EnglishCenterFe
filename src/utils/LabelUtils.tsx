import { CourseStatus } from "@/model/CourseStatus";
import { Chip } from "@mui/material";

export const listTabPart = [
  {
    label: "Part 1",
    value: "1",
  },
  {
    label: "Part 2",
    value: "2",
  },
  {
    label: "Part 3",
    value: "3",
  },
  {
    label: "Part 4",
    value: "4",
  },
  {
    label: "Part 5",
    value: "5",
  },
  {
    label: "Part 6",
    value: "6",
  },
  {
    label: "Part 7",
    value: "7",
  },
];

export const labelTableResult = [
  {
    id: 1,
    name: "Tên đề thi",
  },
  {
    id: 2,
    name: "Số câu trả lời đúng",
  },
  {
    id: 3,
    name: "Số câu hỏi bỏ qua",
  },
  {
    id: 4,
    name: "Số Điểm",
  },
  {
    id: 5,
    name: "Thời gian làm bài",
  },
  {
    id: 6,
    name: "Ngày làm bài",
  },
  {
    id: 6,
    name: "Xem chi tiết",
  },
];

export const labelTableCourseDetail = [
  {
    id: 1,
    name: "Mã khóa học",
  },
  {
    id: 2,
    name: "Tên khóa học",
  },
  {
    id: 3,
    name: "Số tiền",
  },
  {
    id: 4,
    name: "Tổng số chương",
  },
  {
    id: 5,
    name: "số bài học",
  },
];

export const labelTablePaymentHistory = [
  {
    id: 1,
    name: "Mã thanh toán",
  },
  {
    id: 2,
    name: "Tên khóa học",
  },
  {
    id: 3,
    name: "Tên người dùng",
  },
  {
    id: 4,
    name: "Số tiền",
  },
  {
    id: 5,
    name: "Ngày thanh toán",
  },
];

export const getStatusLabelCourse = (
  courseStatus: CourseStatus
): JSX.Element => {
  const map = {
    0: {
      text: "Chưa Đăng Ký",
      color: "error",
    },
    1: {
      text: "Đã Đăng ký",
      color: "success",
    },
    2: {
      text: "Đã hết hạn",
      color: "info",
    },
  };

  const { text, color }: any = map[courseStatus];
  return <Chip sx={{ width: "80%" }} label={text} color={color} />;
};
