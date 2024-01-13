import {
  Accordion,
  AccordionDetails,
  AccordionSummary
} from "@/components/CustomMui/CustomMui";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Typography from "@mui/material/Typography";
import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../CourseDetail.module.scss";
import DialogVideo from "./DialogVideo";

const cx = classNames.bind(styles);
function ListChapter({ course, id }: any) {
  const [expanded, setExpanded] = useState<string | false>("");
  const [openDialogMapVideo, setOpenDialogMapVideo] = useState<any>({});

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleClickOpenVideo = (id: number) => {
    setOpenDialogMapVideo((prevState: any) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleCloseVideo = (id: number) => {
    setOpenDialogMapVideo((prevState: any) => ({
      ...prevState,
      [id]: false,
    }));
  };

  return (
    <div className={cx("panel")}>
      {course.listChapterResponses !== undefined &&
        course.listChapterResponses.map((item: any, index: any) => (
          <Accordion
            key={index}
            // kiểm tra user có đăng kí hay chưa.Nếu chưa thì disable
            // disabled={course.type_user_using === 1 ? false : true}
            // disabled={item.is_free === 1 ? false : true}
            // expanded={expanded === `panel${item.id}`}
            onChange={handleChange(`panel${item.id}`)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>{item.name}</Typography>
            </AccordionSummary>
            {item.lessonsResponses.length > 0 ? (
              item.lessonsResponses.map((lessonsItem: any) => (
                <AccordionDetails
                  key={lessonsItem.id}
                  className={cx(lessonsItem.is_free === 0 && "disable")}
                >
                  <Link
                    to={
                      course.type_user_using === 0 ||
                      course.type_user_using === 2
                        ? `#`
                        : `/course/${id}/learning/${lessonsItem.id}`
                    }
                    className={cx("link", lessonsItem.is_free === 0 && "none")}
                    onClick={() => {
                      course.type_user_using !== 1 &&
                        lessonsItem.is_free === 1 &&
                        handleClickOpenVideo(lessonsItem.id);
                    }}
                  >
                    <PlayCircleOutlineIcon
                      className={cx("icon")}
                      sx={{ color: "#35509a", marginRight: 1.5 }}
                    />
                    <Typography>{lessonsItem.name}</Typography>
                  </Link>
                  {openDialogMapVideo[lessonsItem.id] && (
                    <DialogVideo
                      openDialogMapVideo={openDialogMapVideo}
                      id={lessonsItem.id}
                      handleCloseVideo={handleCloseVideo}
                    />
                  )}
                </AccordionDetails>
              ))
            ) : (
              <AccordionDetails>
                <Typography>Chưa có bài học thuộc chương này</Typography>
              </AccordionDetails>
            )}
          </Accordion>
        ))}
    </div>
  );
}

export default ListChapter;
