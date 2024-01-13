import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  HtmlTooltip,
} from "@/components/CustomMui/CustomMui";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LockIcon from "@mui/icons-material/Lock";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "../VideoCourse.module.scss";

const cx = classNames.bind(styles);

function ListLessons({
  course,
  handleChangeNavigate,
  lessonsId,
  courseId,
}: any) {
  return (
    <>
      {course.listChapterResponses !== undefined &&
        course.listChapterResponses.map((item: any) => (
          <Accordion
            key={item.id}
            // disabled={item.is_free === 1 ? false : true}
            // expanded={expanded === `panel${item.id}`}
            // onChange={handleChangeExpanded(`panel${item.id}`)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ marginRight: 1 }}>{item.name}</Typography>
              <Typography sx={{ textAlign: "right", width: "80%" }}>
                {item.count_lessons_studied}/{item.lessonsResponses.length}
              </Typography>
            </AccordionSummary>
            {item.lessonsResponses.length > 0 ? (
              item.lessonsResponses.map((lessonsItem: any) => (
                <AccordionDetails
                  key={lessonsItem.id}
                  className={cx(
                    lessonsItem.id === Number(lessonsId) && "active",
                    lessonsItem.is_free === 0 &&
                      lessonsItem.is_lock === 1 &&
                      "disable"
                  )}
                >
                  <Link
                    to={
                      lessonsItem.is_lock === 1 || lessonsItem.id === lessonsId
                        ? `#`
                        : `/course/${courseId}/learning/${lessonsItem.id}`
                    }
                    className={cx(
                      "link",
                      (lessonsItem.is_done === 1 ||
                        lessonsItem.is_lock === 1) &&
                        "done"
                    )}
                    onClick={handleChangeNavigate}
                  >
                    <Box sx={{ display: "flex" }}>
                      <PlayCircleOutlineIcon
                        className={cx("icon")}
                        sx={{ color: "#35509a", marginRight: 1.5 }}
                      />
                      <HtmlTooltip
                        placement="top"
                        title={
                          <>
                            <Typography color="inherit">Tên bài học</Typography>
                            {lessonsItem.name}
                          </>
                        }
                      >
                        <Typography gutterBottom={true} className={cx("text")}>
                          {lessonsItem.name}
                        </Typography>
                      </HtmlTooltip>
                    </Box>
                    {lessonsItem.is_lock === 1 && (
                      <LockIcon
                        className={cx("icon")}
                        sx={{ color: "#35509a" }}
                      />
                    )}
                    {lessonsItem.is_done === 1 && (
                      <CheckCircleOutlineIcon
                        className={cx(
                          "icon_check"
                          // lessons.id === 1 && "done"
                        )}
                        sx={{ color: "#5db85c" }}
                      />
                    )}
                  </Link>
                </AccordionDetails>
              ))
            ) : (
              <AccordionDetails>
                <Typography>Chưa có bài học thuộc chương này</Typography>
              </AccordionDetails>
            )}
          </Accordion>
        ))}
    </>
  );
}

export default ListLessons;
