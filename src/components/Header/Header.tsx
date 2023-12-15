import classNames from "classnames/bind";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

import imageHeader from "@/assets/image/Header.png";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import Button from "../Button/Button";
import Image from "../Image/Image";
import Wrapper from "../Popper/Wrapper";
import { routes } from "@/routes/routes";

const cx = classNames.bind(styles);

const Header = () => {
  let isCurrentUser = false;
  let user: any = localStorage.getItem("user");
  let currentUser = JSON.parse(user);

  if (currentUser) {
    isCurrentUser = true;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    isCurrentUser = false;
  };

  const MENU_ITEMS = [
    // {
    //   content: "Lịch học của tôi",
    //   to: `${routes.StudyPlan}`,
    // },
    {
      content: "Trang cá nhân",
      to: `${routes.Profile}`,
    },
    {
      content: "Đăng xuất",
      to: `${routes.Home}`,
      event: handleLogout,
    },
  ];

  const listNavbar = [
    {
      content: "Khóa học của tôi",
      to: `${routes.Profile}`,
    },
    {
      content: "Khóa học online",
      to: `${routes.CourseOnline}`,
    },
    {
      content: "Đề thi online",
      to: `${routes.Exam}`,
    },
  ];

  return (
    <header className={cx("header")}>
      <div className={cx("header-left")}>
        <div className={cx("element")}>
          <Link className={cx("element-link")} to="/">
            <Image src={imageHeader} alt="Hello" className={cx("image")} />
          </Link>
        </div>
      </div>
      <div className={cx("header-right")}>
        {listNavbar.map((item: any, index: any) => (
          <div key={index} className={cx("element")}>
            <NavLink
              className={cx("element-link")}
              to={
                isCurrentUser ||
                (!isCurrentUser &&
                  (item.to === routes.CourseOnline || item.to === routes.Exam))
                  ? item.to
                  : routes.Login
              }
            >
              {item.content}
            </NavLink>
          </div>
        ))}

        {isCurrentUser ? (
          <Tippy
            interactive
            render={(attrs) => (
              <div className={cx("wrapper")} {...attrs}>
                <Wrapper>
                  {MENU_ITEMS.map((item) => (
                    <div>
                      <Link
                        className={cx("element-link")}
                        to={item.to}
                        onClick={item.event}
                      >
                        <p>{item.content}</p>
                      </Link>
                    </div>
                  ))}
                </Wrapper>
              </div>
            )}
          >
            <div className={cx("element")}>
              <Link className={cx("element-link")} to={routes.Profile}>
                <Image src={currentUser.avatar_url} alt="Error" />
                <FontAwesomeIcon icon={faChevronDown} />
              </Link>
            </div>
          </Tippy>
        ) : (
          <div className={cx("element")}>
            <Button content="Đăng nhập" block primary to={routes.Login} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
