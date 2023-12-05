import classNames from "classnames/bind";
import styles from "./ExamDetail.module.scss";


import TabList from "@mui/lab/TabList";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";

const cx = classNames.bind(styles);

function ExamDetailSkeleton() {
  return (
    <div className={cx("body")}>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("header-tags")}></div>
          <Skeleton variant="text" height={40} sx={{ marginTop: 1 }} />
          <div className={cx("header-tags")}>
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
          </div>
          <Skeleton variant="text" height={40} sx={{ marginTop: 1 }} />
          <div className={cx("detail")}>
            <div className={cx("item")}>
              <Skeleton variant="text" height={40} sx={{ marginTop: 1 }} />
            </div>
          </div>
          <div className={cx("detail")}>
            <div className={cx("item")}>
              <Skeleton variant="text" height={40} sx={{ marginTop: 1 }} />
            </div>
          </div>
          <div style={{ width: "70%" }}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList aria-label="lab API tabs example">
                  <Skeleton variant="text" height={40} sx={{ marginTop: 1 }} />
                  <Skeleton variant="text" height={40} sx={{ marginTop: 1 }} />
                </TabList>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamDetailSkeleton;
