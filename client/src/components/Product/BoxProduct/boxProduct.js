import classNames from "classnames/bind";
import styles from "./boxProduct.module.scss";
import images from "~/assets/images";

const cx = classNames.bind(styles);

function BoxProduct({ className, img, alt, tag, price, title, rate }) {
  return (
    <div
      className={cx("box-wrapper", {
        [className]: className,
      })}
    >
      <div className={cx("box-top")}>
        <img src={img} className={cx("image")} alt={alt} />
        <div className={cx("tag-name", "tag-new")}>{tag}</div>
      </div>
      <div className={cx("box-content")}>
        <h3 className={cx("title")}>{title}</h3>
        <div className={cx("rate")}>
          <img src={images.start} />
          <img src={images.start} />
          <img src={images.start} />
          <img src={images.start} />
          <img src={images.start} />
        </div>
        <span className={cx("price")}>${price}</span>
      </div>
    </div>
  );
}

export default BoxProduct;
