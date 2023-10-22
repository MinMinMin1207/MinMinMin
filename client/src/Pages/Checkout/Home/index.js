import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from "./Checkout.module.scss";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import InputItem from "~/components/Layout/Author/InputItem";
import DropDownMenu from "~/components/DropDown";
import axios from "axios";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const COUNTRY = [
  {
    title: "Viet Nam",
  },
  {
    title: "Foreign Nation",
  },
];

const LIST_SHIP = [
  {
    id: 1,
    name: "Flat rate",
    value: 20,
  },
  {
    id: 2,
    name: "Free shipping",
    value: 0,
  },
  {
    id: 3,
    name: "Local pickup",
    value: 45,
  },
];

const PAYMENT = [
  {
    id: 1,
    name: "Direct bank transfer",
    desc: "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
  },
  {
    id: 2,
    name: "Check payments",
    desc: "Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.",
  },
  {
    id: 3,
    name: "Cash on delivery",
    desc: "Pay with cash upon delivery.",
  },
];

// const ITEM = [
//   {
//     name: "Stella & Chewy's Wild weenies grain free chicken recipe freeze dried raw dog treats - 750 grams",
//     price: 16.66,
//   },
//   {
//     name: "Stella & Chewy's Wild weenies grain free chicken recipe freeze dried raw dog treats - 750 grams",
//     price: 16.66,
//   },
//   {
//     name: "Stella & Chewy's Wild weenies grain free chicken recipe freeze dried raw dog treats - 750 grams",
//     price: 16.66,
//   },
// ];

function Checkout() {
  const LIST_CART = useRef(() => {
    let arr = [];
    if (window.localStorage.getItem("cartItem")) {
      arr = JSON.parse(window.localStorage.getItem("cartItem"));
    }
    return arr;
  });

  const totalProduct = LIST_CART.current().reduce((total, currentValue) => {
    return total + currentValue.price * currentValue.quantity;
  }, 0);

  const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [company, setCompany] = useState("");
  // const [country, setCountry] = useState(COUNTRY[0]);
  const [streetAddress, setStreetAddress] = useState("");
  const [streetOptional, setStreetOptional] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [ship, setShip] = useState("");
  const [coupon, setCoupon] = useState("");
  const [payment, setPayment] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [checkDelivery, setCheckDelivery] = useState(false);
  const [totalList, setTotalList] = useState(0);

  // console.log(checkbox);

  useEffect(() => {
    if (ship !== "") setTotalList(totalProduct + ship.value);
  }, [ship]);

  const handleCreateDelivery = async () => {
    const res = await axios.post("http://localhost:3000/deliveries", {
      receiverName: firstName,
      receiverAddress: streetOptional + streetAddress + city,
      receiverPhone: phone,
    });
    if (res.data.code === 200) {
      console.log("Create Delivery");
    } else {
      console.log("Error");
    }
  };

  return (
    <div className={cx("checkout-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("checkout-hero")}>
        <h2 className={cx("heading")}>CHECKOUT</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>CheckOut</span>
        </span>
      </div>
      {/* Body */}
      <div className={cx("body")}>
        {/* Form left */}
        {checkDelivery === false && (
          <>
            <div className={cx("form-left")}>
              <h2 className={cx("heading")}>Billing Details</h2>
              {/* Form */}
              <div className={cx("form")}>
                {/* Row name */}
                <div className={cx("row")}>
                  {/* Full Name */}
                  <InputItem
                    type="text"
                    title="Full name (First and Last name) "
                    placeholder="Full name (First and Last name)"
                    value={firstName}
                    setValue={setFirstName}
                    className={cx("input-item")}
                  />
                </div>
                {/* Row address*/}
                <div className={cx("row", "col")}>
                  <InputItem
                    type="text"
                    title="Street address *"
                    placeholder="Street address"
                    value={streetAddress}
                    setValue={setStreetAddress}
                    className={cx("input-item")}
                  />
                  <InputItem
                    type="text"
                    title=""
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    value={streetOptional}
                    setValue={setStreetOptional}
                    className={cx("input-item")}
                  />
                </div>

                {/* Row tow/city*/}
                <div className={cx("row")}>
                  <InputItem
                    type="text"
                    title="Town / City *"
                    placeholder="Town / City"
                    value={city}
                    setValue={setCity}
                    className={cx("input-item")}
                  />
                </div>

                {/* Row phone*/}
                <div className={cx("row")}>
                  <InputItem
                    type="text"
                    title="Phone number *"
                    placeholder="Phone number"
                    value={phone}
                    setValue={setPhone}
                    className={cx("input-item")}
                  />
                </div>

                {/* Optional
              <div className={cx("row")}>
                <InputItem
                  type="text"
                  title="Order Notes (optional)"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  value={orderNote}
                  setValue={setOrderNote}
                  className={cx("input-item")}
                />
              </div> */}
                <div className={cx("action")} onClick={handleCreateDelivery}>
                  Create
                </div>
              </div>
            </div>
          </>
        )}
        {/* Form right */}
        <div className={cx("form-right")}>
          {/* Box order*/}
          <div className={cx("box", "box-order")}>
            <h2 className={cx("heading")}>Your Order</h2>
            {/* Product */}
            <div className={cx("product")}>
              <h3 className={cx("title")}>Product</h3>
              <div className={cx("list")}>
                {/* List product */}
                {LIST_CART.current().map((item, index) => {
                  return (
                    <div key={index} className={cx("item")}>
                      <h3 className={cx("name")}>{item.title}</h3>
                      <div className={cx("price")}>
                        <span className={cx("name")}>
                          ${item.price * item.quantity}
                        </span>
                        <span className={cx("vat")}>(ex. VAT)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Sub total */}
            <div className={cx("sub-total")}>
              <h3 className={cx("title")}>Subtotal</h3>
              <span className={cx("price")}>
                <span className={cx("name")}>${totalProduct}</span>
                <span className={cx("vat")}>(ex. VAT)</span>
              </span>
            </div>
            {/* Shipping */}
            <div className={cx("shipping")}>
              <h3 className={cx("title")}>Shipping</h3>
              <div className={cx("list-ship")}>
                {LIST_SHIP.map((item, index) => {
                  return (
                    <div key={index} className={cx("item")}>
                      <input
                        type="radio"
                        id={item.name}
                        checked={ship.id === item.id}
                        onChange={() => setShip(item)}
                      />
                      <label htmlFor={item.name} className={cx("name")}>
                        {item.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* VAT */}
            <div className={cx("vat-price")}>
              <h3 className={cx("title")}>VAT</h3>
              <span className={cx("price")}>
                <span className={cx("name")}>$16.66</span>
              </span>
            </div>
            {/* Total */}
            <div className={cx("total")}>
              <h3 className={cx("title")}>Total</h3>
              <span className={cx("price")}>
                <span className={cx("name")}>${totalList}</span>
              </span>
            </div>
          </div>
          {/* Box coupon*/}
          <div className={cx("box", "box-coupon")}>
            <p className={cx("heading")}>
              If you have a coupon code, please apply it below.
            </p>
            <div className={cx("form")}>
              <InputItem
                placeholder="Coupon code"
                value={coupon}
                setValue={setCoupon}
                className={cx("input-item")}
              />
              <div className={cx("action")}>Apply</div>
            </div>
          </div>
          {/* Box payment */}
          <div className={cx("box", "box-payment")}>
            {/* Payment */}
            <div className={cx("payment")}>
              <div className={cx("list-payment")}>
                {PAYMENT.map((item, index) => {
                  return (
                    <div key={index} className={cx("item")}>
                      <section className={cx("select")}>
                        <input
                          type="radio"
                          id={item.name}
                          checked={payment.id === item.id}
                          onChange={() => setPayment(item)}
                        />
                        <label htmlFor={item.name} className={cx("name")}>
                          {item.name}
                        </label>
                      </section>
                      {payment.id === item.id && (
                        <section className={cx("desc")}>{item.desc}</section>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* policy */}
            <div className={cx("policy")}>
              <h3 className={cx("title")}>
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our privacy policy.
              </h3>
            </div>
            {/* checkbox */}
            <div className={cx("checkbox")}>
              <input
                type="checkbox"
                id="checkbox"
                checked={checkbox}
                onChange={() => setCheckbox(!checkbox)}
              />
              <label htmlFor="checkbox" className={cx("title")}>
                I have read and agree to the website terms and conditions *
              </label>
            </div>

            {/* submit */}
            <div className={cx("submit")}>Place order</div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Checkout;
