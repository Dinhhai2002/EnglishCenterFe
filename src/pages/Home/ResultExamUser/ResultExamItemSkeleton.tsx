import Skeleton from "@mui/material/Skeleton/Skeleton";

function ResultExamItemSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <Skeleton key={index} sx={{ marginTop: 1 }} variant="text" />
      ))}

      <Skeleton
        variant="text"
        height={40}
        sx={{ borderRadius: 5 }}
      />
    </>
  );
}

export default ResultExamItemSkeleton;
