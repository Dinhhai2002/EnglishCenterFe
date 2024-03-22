import { Box, Skeleton } from "@mui/material";

function PostItemSkeleton() {
  return (
    <>
      <Skeleton variant="rectangular" height={60} />
      <Skeleton variant="text" height={40} sx={{ marginTop: 1 }} />
      <Box
        sx={{ marginTop: 1, display: "flex", justifyContent: "space-around" }}
      >
        <Skeleton
          variant="text"
          width={100}
          height={40}
          sx={{ borderRadius: 5 }}
        />

        <Skeleton
          variant="text"
          width={100}
          height={40}
          sx={{ borderRadius: 5 }}
        />
      </Box>
      <Skeleton sx={{ marginTop: 1 }} variant="text" />
      <Skeleton sx={{ marginTop: 1 }} variant="text" />
      <Skeleton
        sx={{ marginTop: 1, margin: "10px auto", borderRadius: 5 }}
        variant="text"
        width={"80%"}
        height={40}
      />
    </>
  );
}

export default PostItemSkeleton;
