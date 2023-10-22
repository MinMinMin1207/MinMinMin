import classNames from "classnames/bind";
import { useEffect, useState, useRef } from "react";
import styles from "./Cart.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "../../components/Layout/FooterMember";
import images from "~/assets/images";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, saveToCart } from "../../Redux/cartSlice";
import { Link } from "react-router-dom";
import Check from "~/components/Popup/Check";

const cx = classNames.bind(styles);

function Cart() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(""); // Show popup add to cart

  const LIST_CART = useRef(() => {
    let arr = [];
    if (window.localStorage.getItem("cartItem")) {
      arr = JSON.parse(window.localStorage.getItem("cartItem"));
    }
    return arr;
  }, []);

  const [listCart, setListCart] = useState(LIST_CART.current());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCart(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [showCart]);

  // Check LIST_CART in localStorage
  const handleDecrease = (cart_index) => {
    const temp = [...listCart];
    if (temp[cart_index].quantity >= 1) temp[cart_index].quantity--;
    setListCart(temp);
  };
  const handleIncrease = (cart_index) => {
    const temp = [...listCart];
    temp[cart_index].quantity++;
    setListCart(temp);
  };

  const deleteCart = (cart_index) => {
    const temp = [...listCart].filter((item, index) => index !== cart_index);
    setListCart(temp);
  };

  const handleDeleteCart = () => {
    setListCart([]);
  };

  const handleUpdateCart = () => {
    setShowCart(true);
    dispatch(
      saveToCart({
        listCart: listCart,
        totalCart: totalCart,
      })
    );
  };

  const totalCart = listCart.reduce((total, currentValue) => {
    return total + currentValue.price * currentValue.quantity;
  }, 0);
  let total = totalCart + 100; //TotalCart + ship(100$)

  return (
    <div className={cx("cart-wrapper")}>
      <Check
        title="The shopping cart has been updated"
        className={cx({
          "show-cart": showCart === true,
        })}
      />
      <Header />
      {/* Hero */}
      <div className={cx("cart-hero")}>
        <h2 className={cx("heading")}>WISHLIST</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>Wishlist</span>
        </span>
      </div>
      {/* Main */}
      <main className={cx("main-wrapper")}>
        {/* List table */}
        <div className={cx("list-table")}>
          <table className={cx("table")}>
            <thead className={cx("table-header")}>
              <tr>
                <th className={cx("table-item", "table-image")}>IMAGE</th>
                <th className={cx("table-item", "table-product")}>PRODUCT</th>
                <th className={cx("table-item", "table-price")}>PRICE</th>
                <th className={cx("table-item", "table-quantity")}>QUANTITY</th>
                <th className={cx("table-item", "table-total")}>TOTAL</th>
                <th className={cx("table-item", "table-remove")}>REMOVE</th>
              </tr>
            </thead>
            <tbody className={cx("table-body")}>
              {listCart.map((cart, index) => {
                return (
                  <tr key={index} className={cx("table-row")}>
                    <td className={cx("table-item", "table-image")}>
                      <div className={cx("image")}>
                        <img src={cart.img} alt="cart" className={cx("img")} />
                      </div>
                    </td>
                    <td className={cx("table-item")}>{cart.title}</td>
                    <td className={cx("table-item")}>{`$${cart.price}`}</td>
                    <td className={cx("table-item")}>
                      <div className={cx("quantity")}>
                        <span
                          className={cx("minus", "item")}
                          onClick={() => handleDecrease(index)}
                        >
                          -
                        </span>
                        <div className={cx("input-number", "item")}>
                          {cart.quantity}
                        </div>
                        <span
                          className={cx("plus", "item")}
                          onClick={() => handleIncrease(index)}
                        >
                          +
                        </span>
                      </div>
                    </td>
                    <td className={cx("table-item")}>
                      ${cart.price * cart.quantity}
                    </td>
                    <td className={cx("remove")}>
                      <img
                        src={images.bin}
                        alt="bin"
                        className={cx("bin")}
                        onClick={() => deleteCart(index)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={cx("table-footer")}>
            {/* Action left */}
            <div className={cx("action-left")}>
              <Link to="/shop">
                <div className={cx("action-item")}>CONTINUE SHOPPING</div>
              </Link>
              <div className={cx("action-item")} onClick={handleUpdateCart}>
                UPDATE SHOPPING CART
              </div>
            </div>
            {/* Action right */}
            <div className="action-right">
              <div className={cx("action-item")} onClick={handleDeleteCart}>
                CLEAR SHOPPING CART
              </div>
            </div>
          </div>
        </div>

        {/* Cart total */}
        <div className={cx("cart-total")}>
          <h3 className={cx("title")}>Cart Totals</h3>
          <div className={cx("content")}>
            {/* Menu */}
            <div className={cx("menu")}>
              <div className={cx("menu-left")}>
                <span>Sub Total</span>
                <div className={cx("border")}></div>
              </div>
              <div className={cx("menu-right")}>${totalCart}</div>
            </div>
            {/* Menu */}
            <div className={cx("menu")}>
              <div className={cx("menu-left")}>
                <span>Shipping</span>
                <div className={cx("border")}></div>
              </div>
              <div className={cx("menu-right")}>$100</div>
            </div>
            {/* Menu */}
            <div className={cx("menu")}>
              <div className={cx("menu-left")}>
                <span>Total</span>
                <div className={cx("border")}></div>
              </div>
              <div className={cx("menu-right", "total")}>${total}</div>
            </div>
          </div>
          <Link to="/checkout">
            <div className={cx("action")}>PROCEED TO CHECKOUT</div>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Cart;
