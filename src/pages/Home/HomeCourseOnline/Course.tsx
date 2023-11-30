import { HtmlTooltip } from "@/components/CustomMui/CustomMui";
import { getStatusLabelCourse } from "@/utils/LabelUtils";
import utils from "@/utils/Utils";
import { Chip, Typography } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import classNames from "classnames/bind";
import styles from "./HomeCourseOnline.module.scss";

const cx = classNames.bind(styles);

function Course({ item }: any) {
  return (
    <>
      <img src={item.banner} alt="error" />
      <HtmlTooltip
        placement="top"
        title={
          <>
            <Typography color="inherit">Mô tả khóa học</Typography>
            {item.description}
          </>
        }
      >
        <span className={cx("description")}>
          {item.description ? item.description : "Không có mô tả!"}
        </span>
      </HtmlTooltip>

      <Chip
        sx={{ margin: 2 }}
        variant="outlined"
        color="primary"
        icon={<TagIcon />}
        label="khóa học online"
      />

      <Chip
        sx={{ margin: 2 }}
        variant="outlined"
        color={item.is_free === 1 ? "info" : "error"}
        icon={<TagIcon />}
        label={item.is_free === 1 ? "Miễn phí" : "Có phí"}
      />

      <Typography>{item.name}</Typography>
      {/* <button type="submit">#Khóa học online</button> */}
      <div className={cx("price")}>
        <p className={cx("sale")}>
          {utils.formatMoney(
            item.price - (item.price * item.discount_percent) / 100
          )}
          đ
        </p>
        <p className={cx("initial")}>
          {item.discount_percent > 0 && utils.formatMoney(item.price) + "đ"}
        </p>
      </div>
      <div className={cx("label")}>
        {getStatusLabelCourse(item.type_user_using ? item.type_user_using : 0)}
      </div>
    </>
  );
}

export default Course;
