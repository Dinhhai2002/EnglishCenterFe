import { Skeleton } from "@mui/material";

function ListLessonsSkeleton() {
  return (
    <>
      <Skeleton variant="text" height={80} sx={{ marginLeft: 1 }} />
      <Skeleton variant="text" height={80} sx={{ marginLeft: 1 }} />
      <Skeleton variant="text" height={80} sx={{ marginLeft: 1 }} />
    </>
  );
}

export default ListLessonsSkeleton;
