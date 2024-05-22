import classNames from "classnames/bind";
import Image from "../Image/Image";
import styles from "./Empty.module.scss";
import images from "@/assets/image/empty.gif";

const cx = classNames.bind(styles);
function Empty() {
  return (
    <div className={cx("content")}>
      {/* <h2>Wow, thiệt trống trải quá đi 🙄</h2> */}
      <Image src={images} />
    </div>
  );
}

export default Empty;
