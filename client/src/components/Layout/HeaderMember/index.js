import classNames from "classnames/bind";
import images from "~/assets/images";
import styles from "./Header.module.scss";
import jwtDecode from "jwt-decode";
import cookie from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function HeaderMember() {
  const [userData, setUserData] = useState("");

  let numberCart = useSelector((state) => state.cart.cartItem).length;

  function clearToken() {
    document.cookie = "token" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/";
  }

  useEffect(() => {
    // cookie = new Map(document.cookie.split(";").map((each) => each.split("=")));
    try {
      const token = cookie.get("token");
      console.log(token);
      if (token) {
        const decodedUserData = jwtDecode(token);
        setUserData(decodedUserData);
        console.log(decodedUserData);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <header className={cx("header")}>
      {/* Header left */}
      <div className={cx("header-left")}>
        <div className={cx("logo")}>
          <img
            src={images.logo}
            alt="Paws and Whiskers"
            className={cx("img-logo")}
          />
          <div className={cx("text-logo")}>
            <span className={cx("paws")}>Paws</span>
            <span className={cx("and")}>and</span>
            <span className={cx("whiskers")}>Whiskers</span>
          </div>
        </div>
        {/* Navbar left */}
        <nav className={cx("navbar")}>
          {/* Nav item */}
          <Link to="/home">
            <div className={cx("nav-item")}>
              <span className={cx("text-item")}>HOME</span>
              <img src={images.iconNav} alt="icon" className={cx("icon-nav")} />
            </div>
          </Link>
          {/* Nav item */}
          <Link to="/shop">
            <div className={cx("nav-item")}>
              <span className={cx("text-item")}>SHOP</span>
              <img src={images.iconNav} alt="icon" className={cx("icon-nav")} />
            </div>
          </Link>
          {/* Nav item */}
          <Link to="/about">
            <div className={cx("nav-item")}>
              <span className={cx("text-item")}>ABOUT</span>
              <img src={images.iconNav} alt="icon" className={cx("icon-nav")} />
            </div>
          </Link>
          {/* Nav item */}
          <Link to="/blog">
            <div className={cx("nav-item")}>
              <span className={cx("text-item")}>BLOG</span>
              <img src={images.iconNav} alt="icon" className={cx("icon-nav")} />
            </div>
          </Link>
          {/* Nav item */}
          <Link to="/page">
            <div className={cx("nav-item")}>
              <span className={cx("text-item")}>PAGE</span>
              <img src={images.iconNav} alt="icon" className={cx("icon-nav")} />
            </div>
          </Link>
          {/* Nav item */}
          <div className={cx("nav-item")}>
            <span className={cx("text-item")}>CONTACT</span>
            <img src={images.iconNav} alt="icon" className={cx("icon-nav")} />
          </div>
        </nav>
      </div>

      {/* Header right */}
      <div className={cx("header-right")}>
        <img
          src={images.iconSearch}
          alt="search"
          className={cx("icon-search")}
        />
        <Link to="/cart">
          <div className={cx("cart")}>
            <img src={images.iconCart} className={cx("icon-cart")} alt="cart" />
            <span>CART</span>
            <span className={cx("number-cart")}>{numberCart}</span>
          </div>
        </Link>
        <div className={cx("mess")}>
          <img
            src={images.iconMessage}
            className={cx("icon-mess")}
            alt="message"
          />
        </div>
        <div className={cx("bell")}>
          <img src={images.iconBell} className={cx("icon-bell")} alt="bell" />
        </div>
        <div className={cx("info-name")}>
          <img src={images.optionCat} className={cx("avatar")} />
          <span className={cx("username")}>{userData.email}</span>
          <div className={cx("role")}>
            <div
              onClick={clearToken}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img src={images.logout} alt="logout" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderMember;
