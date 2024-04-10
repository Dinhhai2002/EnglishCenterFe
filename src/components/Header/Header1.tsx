import classNames from "classnames/bind";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

import imageHeader from "@/assets/image/Header.png";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import Image from "../Image/Image";
import Wrapper from "../Popper/Wrapper";
import { routes } from "@/routes/routes";
import { NavLink as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";

const cx = classNames.bind(styles);

const Header1 = () => {
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
    {
      content: "Blog",
      to: `${routes.Blog}`,
    },
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
      content: "KHÓA HỌC CỦA TÔI",
      to: `${routes.Profile}`,
    },
    {
      content: "KHÓA HỌC ONLINE",
      to: `${routes.CourseOnline}`,
    },
    {
      content: "ĐỀ THI ONLINE",
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
                        key={item.content}
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
          <div className={cx("element-btn")}>
            <Button
              disableRipple
                component={RouterLink}
                variant="contained"
                to={routes.Login}
            >
              Đăng nhập
            </Button>
            <Button
              sx={{ marginLeft: 1 }}
              disableRipple
              component={RouterLink}
              variant="contained"
              to={routes.Register}
            >
              Đăng ký
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header1;
