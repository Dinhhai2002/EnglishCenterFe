import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Button({
  primary = false,
  outline = false,
  none = false,
  to,
  href,
  className,
  block = false,
  content,
  active = false,
  transparent = false,
  fullWidth=false,
  onClick,
  ...passProps
}: any) {
  const classes = cx("btn_detail", {
    [className]: className,
    primary,
    outline,
    none,
    block,
    active,
    transparent,
    fullWidth
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
    <>
      <Comp className={classes} {...props}>
        {content}
      </Comp>
    </>
  );
}

export default Button;
