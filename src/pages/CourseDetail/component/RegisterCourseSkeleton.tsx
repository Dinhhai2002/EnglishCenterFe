import { Grid, Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import styles from "../CourseDetail.module.scss";

const cx = classNames.bind(styles);
function RegisterCourseSkeleton() {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      item
      xs={4}
    >
      <div className={cx("image")}>
        <Skeleton
          sx={{ marginTop: 1, margin: "10px auto", borderRadius: 5 }}
          variant="text"
          width="80%"
          height={200}
        />
      </div>

      <div className={cx("btn")}>
        <Skeleton
          sx={{ marginTop: 1, margin: "10px auto", borderRadius: 5 }}
          variant="text"
          height={80}
        />
      </div>

      <div className={cx("list")}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            sx={{ margin: "2px auto", borderRadius: 5 }}
            variant="text"
            width={300}
            height={40}
          />
        ))}
      </div>
    </Grid>
  );
}

export default RegisterCourseSkeleton;
