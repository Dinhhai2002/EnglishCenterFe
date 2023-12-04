import { Grid, Skeleton } from "@mui/material";

function CategorySkeleton() {
  return (
    <>
      <Grid sx={{ marginTop: 0 }} item xs={2}>
        <Skeleton
          variant="text"
          width={100}
          height={40}
          sx={{ borderRadius: 5 }}
        />
      </Grid>
    </>
  );
}

export default CategorySkeleton;
