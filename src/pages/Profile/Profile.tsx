import classNames from "classnames/bind";
import Navbar from "./Navbar/Navbar";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);

function Profile() {
  return (
    <div className={cx("body")}>
        <div className={cx("container", "background")}>
          <div className={cx("content")}>
            <Navbar />
          </div>
        </div>
    </div>
  );
}

export default Profile;
