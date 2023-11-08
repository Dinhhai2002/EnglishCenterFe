import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { createTheme, ThemeProvider } from "@mui/material";
import Navbar from "./Navbar/Navbar";

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
