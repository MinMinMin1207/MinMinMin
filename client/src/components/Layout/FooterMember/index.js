import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function FooterMember() {
  return (
    <div className={cx("footer-wrapper")}>
      {/* Nav list */}
      <div className={cx("nav-list")}>
        <h2 className={cx("nav-title")}>ABOUT US</h2>
        <div>
          <span className="nav-desc">
            Lorem ipsum dolor sit amet, co adipisi elit, sed eiusmod tempor
            incididunt ut labore et dolore
          </span>
          <div className={cx("list-icon")}>
            <img src={images.iconFB} className={cx("icon-img")} />
            <img src={images.iconX} className={cx("icon-img")} />
            <img src={images.iconInsta} className={cx("icon-img")} />
            <img src={images.iconGmail} className={cx("icon-img")} />
          </div>
        </div>
      </div>
      {/* Nav list */}
      <div className={cx("nav-list")}>
        <h2 className={cx("nav-title")}>USEFUL LINKS</h2>
        <ul>
          <li className={cx("nav-item")}>Help & Contact Us</li>
          <li className={cx("nav-item")}>Returns & Refunds</li>
          <li className={cx("nav-item")}>Online Stores</li>
          <li className={cx("nav-item")}>Terms & Conditions</li>
        </ul>
      </div>
      {/* Nav list */}
      <div className={cx("nav-list")}>
        <h2 className={cx("nav-title")}>HELP</h2>
        <ul>
          <li className={cx("nav-item")}>Wishlist</li>
          <li className={cx("nav-item")}>Pricing Plans</li>
          <li className={cx("nav-item")}>Order Tracking</li>
          <li className={cx("nav-item")}>Returns</li>
        </ul>
      </div>
      {/* Nav list */}
      <div className={cx("nav-list")}>
        <h2 className={cx("nav-title")}>QUICK MENU</h2>
        <ul>
          <li className={cx("nav-item")}>Login</li>
          <li className={cx("nav-item")}>My-Account</li>
          <li className={cx("nav-item")}>Wishlist</li>
          <li className={cx("nav-item")}>Checkout</li>
        </ul>
      </div>
    </div>
  );
}

export default FooterMember;
