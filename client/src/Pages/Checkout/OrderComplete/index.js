import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./OrderComplete.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";

const cx = classNames.bind(styles);

function OrderDetails() {
  return (
    <div className={cx("order-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("order-hero")}>
        <h2 className={cx("heading")}>CHECKOUT</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>OrderComplete</span>
        </span>
      </div>
      {/* Body */}
      <div className={cx("body")}>
        {/* Header */}
        <div className={cx("header")}>
          <p className={cx("para")}>Thank you. Your order has been received.</p>
          <div className={cx("info-basic")}>
            {/* Order */}
            <div className={cx("order", "number")}>
              <h4 className={cx("title")}>Order Number:</h4>
              <span className={cx("desc")}>13877</span>
            </div>
            {/* Order */}
            <div className={cx("order", "number")}>
              <h4 className={cx("title")}>Order Date:</h4>
              <span className={cx("desc")}>October 6, 2023</span>
            </div>
            {/* Order */}
            <div className={cx("order", "number")}>
              <h4 className={cx("title")}>Order Total:</h4>
              <span className={cx("desc")}>$20.82</span>
            </div>
            {/* Order */}
            <div className={cx("order", "number")}>
              <h4 className={cx("title")}>Payment Method:</h4>
              <span className={cx("desc")}>Check payments</span>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className={cx("content")}>
          <h2 className={cx("heading")}>Order Details</h2>
          {/* Form */}
          <div className={cx("form")}>
            {/* Product Item*/}
            <div className={cx("product-item")}>
              <div className={cx("row")}>
                <h3 className={cx("title", "product-col")}>Product</h3>
                <h3 className={cx("title", "total-col")}>Total</h3>
              </div>
              <div className={cx("list-product")}>
                <div className={cx("row", "item")}>
                  <p className={cx("name")}>
                    carefresh®️ Small Pet Bedding - Natural - 500 grams x1
                  </p>
                  <div className={cx("total", "total-col")}>
                    <span className={cx("price")}>$8.33</span>
                    <span className={cx("vat")}>(e x. VAT)</span>
                  </div>
                </div>
                <div className={cx("row", "item")}>
                  <p className={cx("name")}>
                    carefresh®️ Small Pet Bedding - Natural - 500 grams x1
                  </p>
                  <div className={cx("total", "total-col")}>
                    <span className={cx("price")}>$8.33</span>
                    <span className={cx("vat")}>(ex. VAT)</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Subtotal Item*/}
            <div className={cx("subtotal-item")}>
              <div className={cx("row")}>
                <h3 className={cx("title")}>Subtotal: </h3>
                <div className={cx("total", "total-col")}>
                  <span className={cx("price")}>$16.6</span>
                  <span className={cx("vat")}>(ex. VAT)</span>
                </div>
              </div>
            </div>
            {/* Shipping Item*/}
            <div className={cx("subtotal-item")}>
              <div className={cx("row")}>
                <h3 className={cx("title")}>Shipping: </h3>
                <div className={cx("total", "total-col")}>
                  <span className={cx("price")}>Flat rate</span>
                </div>
              </div>
            </div>
            {/* VAT Item*/}
            <div className={cx("vat-item")}>
              <div className={cx("row")}>
                <h3 className={cx("title")}>VAT: </h3>
                <div className={cx("total", "total-col")}>
                  <span className={cx("price")}>$3.32</span>
                </div>
              </div>
            </div>
            {/* Payment Item*/}
            <div className={cx("payment-item")}>
              <div className={cx("row")}>
                <h3 className={cx("title")}>Payment Method: </h3>
                <div className={cx("total", "total-col")}>
                  <span className={cx("price")}>Direct bank transfer</span>
                </div>
              </div>
            </div>
            {/* Order Item*/}
            <div className={cx("order-item")}>
              <div className={cx("row")}>
                <h3 className={cx("title")}>Order Total: </h3>
                <div className={cx("total", "total-col")}>
                  <span className={cx("price")}>$19.98</span>
                </div>
              </div>
            </div>
            {/* Note Item*/}
            <div className={cx("note-item")}>
              <div className={cx("row")}>
                <h3 className={cx("title")}>Note Total: </h3>
                <div className={cx("total", "total-col")}>
                  <span className={cx("name")}>
                    Your shop have the best product ever. I love it. Hope Paws
                    and Whiskers can go over the world so that I can connect
                    more friends and have more connective guys like me.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default OrderDetails;
