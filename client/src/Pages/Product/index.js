import classNames from "classnames/bind";
import styles from "./Product.module.scss";

import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartHide } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartShow } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Check from "~/components/Popup/Check";
import { addToCart } from "../../Redux/cartSlice";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function Product() {
  let params = useParams();
  const [follow, setFollow] = useState(false);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState({
    quantity: 1,
  });
  const [showCart, setShowCart] = useState(""); // Show popup add to cart

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // fetchData
  useEffect(() => {
    async function fetchData() {
      let res = await axios.get(`http://localhost:3000/products/${params.id}`);
      setProduct(res.data.data);
      setCart({
        id: res.data.data.id,
        img: `http://localhost:3000/${res.data.data.image}`,
        title: res.data.data.productName,
        price: res.data.data.price,
        ...cart,
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCart(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [showCart]);

  const handleFollow = () => {
    setFollow(!follow);
  };

  const handleDecrease = () => {
    if (cart.quantity - 1 > 0)
      setCart((prev) => {
        return {
          ...prev,
          quantity: prev.quantity - 1,
        };
      });
  };

  const handleIncrease = () => {
    if (cart.quantity + 1 <= product.quantity)
      setCart((prev) => {
        return {
          ...prev,
          quantity: prev.quantity + 1,
        };
      });
  };

  const handleAddtoCart = () => {
    setShowCart(true);
    dispatch(addToCart(cart));
  };

  return (
    <div className={cx("product-wrapper")}>
      <Check
        title="The product has been added to the cart"
        className={cx({
          "show-cart": showCart === true,
        })}
      />
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("product-hero")}>
        <h2 className={cx("heading")}>PRODUCT DETAILS</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>Shopping</span>
        </span>
      </div>
      {/* Main */}
      <main className={cx("main")}>
        {/* Product */}
        <div className={cx("product")}>
          <div className={cx("images-product")}>
            <img
              src={`http://localhost:3000/${product.image}`}
              alt="Images"
              className={cx("img")}
            />
          </div>
          <div className={cx("property-product")}>
            <div>
              <h2 className={cx("name-product")}>{product.productName}</h2>
              <span className={cx("author")}>
                by
                <span className={cx("name")}>HAVENN</span>
              </span>
            </div>
            <span className={cx("price")}>${product.price}</span>
            <span className={cx("")}>SKU: 12345</span>
            <div className={cx("availability")}>
              <span className={cx("title")}>Availability: </span>
              <span className={cx("number")}>
                {product.quantity} Left in Stock
              </span>
            </div>
            {/* Desc */}
            <p className={cx("desc")}>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text.
            </p>
            {/* Size */}
            <div className={cx("size")}>
              <span className={cx("title")}>Size: </span>
              <span className={cx("number-size")}>{product.size}</span>
            </div>
            {/* Qty */}
            <div className={cx("qty")}>
              <span className={cx("title")}>Qty: </span>
              <div className={cx("box-qty")}>
                <span className={cx("minus")} onClick={handleDecrease}>
                  -
                </span>
                <span className={cx("number")}>{cart.quantity}</span>
                <span className={cx("plus")} onClick={handleIncrease}>
                  +
                </span>
              </div>
            </div>
            {/* Add to cart */}
            <div className={cx("action-cart")}>
              <div className={cx("cart")} onClick={handleAddtoCart}>
                ADD TO CART
              </div>
              <div className={cx("follow")} onClick={handleFollow}>
                <FontAwesomeIcon
                  icon={faHeartHide}
                  className={cx("icon", {
                    hide: follow === false,
                  })}
                />
                <FontAwesomeIcon
                  icon={faHeartShow}
                  className={cx("icon", {
                    show: follow === true,
                  })}
                />
              </div>
            </div>

            {/* Add to cart */}
            <div className={cx("action-buy")}>
              <div className={cx("buy")}>BUY IT NOW</div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Product;
