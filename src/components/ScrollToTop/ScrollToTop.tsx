import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./ScrollToTop.module.scss";

const cx = classNames.bind(styles);

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={cx("top-to-btm")}>
      {" "}
      {showTopBtn && (
        <FontAwesomeIcon
          icon={faAngleUp}
          className={cx("icon-position","icon-style")}
          onClick={goToTop}
        />
      )}{" "}
    </div>
  );
};
export default ScrollToTop;
