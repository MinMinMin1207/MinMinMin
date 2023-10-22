import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Author.module.scss";
import Navigation from "~/components/Navigation";

const cx = classNames.bind(styles);

function Author({ children, className }) {
  //Active true ? Login : Register
  const [active, setActive] = useState(() => {
    const data = JSON.parse(
      window.localStorage.getItem("LOGIN_REGISTER_ACTIVE")
    );
    if (data === true || data === false) return data;
    return true;
  });

  useEffect(() => {
    window.localStorage.setItem(
      "LOGIN_REGISTER_ACTIVE",
      JSON.stringify(active)
    );
  }, [active]);

  const leftClick = () => {
    setActive(true);
  };

  const rightClick = () => {
    setActive(false);
  };

  return (
    <div
      className={cx("author-wrapper", {
        [className]: className,
      })}
    >
      <div className="container">
        <div className={cx("header")}>
          <Navigation />
        </div>
        <div className={cx("form-body")}>
          <h1 className={cx("title")}>My account</h1>
          <div className={cx("nav-link")}>
            <Link
              to="/login"
              className={cx("action", "sign-in", {
                active: active === true,
              })}
              onClick={leftClick}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className={cx("action", "register", {
                active: active === false,
              })}
              onClick={rightClick}
            >
              Register
            </Link>
          </div>
        </div>
        <div className={cx("form")}>{children}</div>
      </div>
    </div>
  );
}

export default Author;
