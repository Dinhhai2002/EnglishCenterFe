import { Result } from "@/types/Result";
import { Button } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
interface ListResultProps {
  result: Result;
}
function ResultExamItem({ result }: ListResultProps) {
  return (
    <>
      <h2>{result.name_exam}</h2>
      <p>Ngày làm bài: {result.created_at}</p>
      <p>Thời gian hoàn thành: {result.time_complete}</p>
      <p>Kết quả: {result.total_question_correct}/100</p>
      <p>Điểm: {result.total_point}</p>
      <Button
        component={RouterLink}
        to={`/tests/${result.exam_id}/${result.name_exam}/results/${result.id}`}
        variant="outlined"
        fullWidth
      >
        Xem chi tiết
      </Button>
    </>
  );
}

export default ResultExamItem;
