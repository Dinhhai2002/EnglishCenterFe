import classNames from "classnames/bind";
import styles from "./Tags.module.scss";

import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Tags({
  title,
  normally,
  primary,
  active,
  className,
  to,
  href,
  onClick,
  ...passProps
}: any) {
  const classes = cx("btn_detail", {
    [className]: className,
    primary,
    active,
    normally,
  });

  let Comp: any = "button";
  const props = {
    onClick,
    ...passProps,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  return (
    <div className={cx("btn")}>
      <Comp className={classes} {...props}>
        {title}
      </Comp>
    </div>
  );
}

export default Tags;
