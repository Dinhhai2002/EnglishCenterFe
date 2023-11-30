import { Skeleton } from "@mui/material";

function ExamItemSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }, (_, index) => (
        <Skeleton key={index} sx={{ marginTop: 1 }} variant="text" />
      ))}

      <Skeleton
        variant="text"
        width={80}
        height={40}
        sx={{ borderRadius: 5 }}
      />
       <Skeleton
        variant="text"
        height={40}
        sx={{ borderRadius: 5 }}
      />
    </>
  );
}

export default ExamItemSkeleton;
