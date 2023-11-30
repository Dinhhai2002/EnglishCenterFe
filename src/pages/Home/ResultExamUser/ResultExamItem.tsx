import Button from "@/components/Button/Button";

function ResultExamItem({ item }: any) {
  return (
    <>
      <h2>{item.name_exam}</h2>
      <p>Ngày làm bài: {item.created_at}</p>
      <p>Thời gian hoàn thành: {item.time_complete}</p>
      <p>Kết quả: {item.total_question_correct}/100</p>
      <p>Điểm: {item.total_point}</p>
      <Button
        to={`/tests/${item.exam_id}/${item.name_exam}/results/${item.id}`}
        primary
        block
        content="Xem chi tiết"
      />
    </>
  );
}

export default ResultExamItem;
