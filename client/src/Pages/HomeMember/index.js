import classNames from "classnames/bind";
import styles from "./HomeMember.module.scss";
import images from "~/assets/images";
import BoxProduct from "~/components/Product/BoxProduct/boxProduct";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import jwtDecode from "jwt-decode";
import cookie from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";
axios.defaults.withCredentials = true;
const cx = classNames.bind(styles);

function HomeMember() {
  const [pets, setPets] = useState([]);
  const [storeActive, setStoreActive] = useState({
    pet: true,
    product: false,
    gift: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get("http://localhost:3000/products");
      setPets(res.data.data);
    }
    fetchData();
  }, []);

  const handlePet = () => {
    setStoreActive({
      pet: true,
      product: false,
      gift: false,
    });
  };

  const handleProduct = () => {
    setStoreActive({
      pet: false,
      product: true,
      gift: false,
    });
  };

  const handleGift = () => {
    setStoreActive({
      pet: false,
      product: false,
      gift: true,
    });
  };

  console.log(pets);

  return (
    <div className={cx("home-wrapper")}>
      {/* Header */}
      <Header />

      {/* Banner */}
      <div className={cx("banner")}>
        <img
          src={images.bannerHome}
          className={cx("banner-img")}
          alt="banner"
        />
        <div className={cx("banner-content")}>
          <h1 className={cx("title")}>We keep pets for pleasure.</h1>
          <h3 className={cx("slogan")}>Vitamins For all Pets</h3>
          <p className={cx("desc")}>
            We know your concerns when you are looking for a chewing treat for
            your dog.
          </p>
          <div className={cx("action")}>SHOP NOW</div>
        </div>
      </div>

      {/* Body */}
      <main className={cx("main")}>
        {/* Option */}
        <div className={cx("option")}>
          {/* Option item */}
          <div className={cx("option-item")}>
            <img
              src={images.optionDog}
              alt="DOGS"
              className={cx("option-item")}
            />
            <h4 className={cx("title")}>DOGS</h4>
          </div>

          {/* Option item */}
          <div className={cx("option-item")}>
            <img
              src={images.optionStuff}
              alt="STUFFS"
              className={cx("option-item")}
            />
            <h4 className={cx("title")}>STUFFS</h4>
          </div>

          {/* Option item */}
          <div className={cx("option-item")}>
            <img
              src={images.optionCat}
              alt="CATS"
              className={cx("option-item")}
            />
            <h4 className={cx("title")}>CATS</h4>
          </div>
        </div>

        {/* Store */}
        <div className={cx("store")}>
          {/* Store header */}
          <div className={cx("store-header")}>
            <span
              className={cx("store-nav", {
                storeActive: storeActive.pet === true,
              })}
              onClick={handlePet}
            >
              Pet
            </span>
            <span
              className={cx("store-nav", {
                storeActive: storeActive.product === true,
              })}
              onClick={handleProduct}
            >
              Product
            </span>
            <span
              className={cx("store-nav", {
                storeActive: storeActive.gift === true,
              })}
              onClick={handleGift}
            >
              Gift
            </span>
          </div>
          <div className={cx("store-content")}>
            {/* Store content */}
            {pets.map((item, index) => {
              return (
                <Link to={`/product/${item.id}`} key={index}>
                  <BoxProduct
                    img={`http://localhost:3000/${item.image}`}
                    title={item.productName}
                    rate={item.species}
                    price={item.price}
                    tag={item.size}
                    className={cx("box-product")}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sale */}
        <div className={cx("sale")}>
          <img src={images.homeImg} alt="1" />
          <img src={images.homeImg1} alt="1" />
        </div>

        {/* Deal */}
        <div className={cx("deal")}>
          <div className={cx("deal-header")}>
            <h2 className={cx("title")}>Deal Of The Week</h2>
          </div>
          <div className={cx("deal-content")}>
            <div className={cx("deal-left")}>
              <img src={images.cat} className={cx("cat-img")} />
            </div>
            <div className={cx("deal-right")}>
              <h3 className={cx("title")}>An Animal Album</h3>
              <div className={cx("rate")}>
                <img src={images.start} />
                <img src={images.start} />
                <img src={images.start} />
                <img src={images.start} />
              </div>
              <span className={cx("price")}>$80.00</span>
              <p className={cx("desc")}>
                Nam libero tempore, cum soluta nobis est eligendi optio cumque
                nihil impedit quo minus id quod maxime placeat facere possimus,
                omnis voluptas assumenda est, omnis dolor repellendus.{" "}
              </p>
              <div className={cx("timedate")}>
                {/* Time item */}
                <div className={cx("time-item")}>
                  <span className={cx("time")}>1910</span>
                  <span className={cx("border")}></span>
                  <span className={cx("date")}>Days</span>
                </div>
                {/* Time item */}
                <div className={cx("time-item")}>
                  <span className={cx("time")}>1910</span>
                  <span className={cx("border")}></span>
                  <span className={cx("date")}>Days</span>
                </div>
                {/* Time item */}
                <div className={cx("time-item")}>
                  <span className={cx("time")}>22</span>
                  <span className={cx("border")}></span>
                  <span className={cx("date")}>Hours</span>
                </div>
                {/* Time item */}
                <div className={cx("time-item")}>
                  <span className={cx("time")}>25</span>
                  <span className={cx("border")}></span>
                  <span className={cx("date")}>Mins</span>
                </div>
                {/* Time item */}
                <div className={cx("time-item")}>
                  <span className={cx("time")}>30</span>
                  <span className={cx("border")}></span>
                  <span className={cx("date")}>Secs</span>
                </div>
              </div>
              <div className={cx("shopnow")}>SHOP NOW</div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className={cx("feedback")}>
          <h2 className={cx("title")}>
            Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis
            tortor. Nunc scelerisque, nisi a blandit varius, nunc purus
            venenatis ligula, sed venenatis orci augue nec sapien. Cum sociis
            natoque
          </h2>
          <img
            src="https://ik.imagekit.io/tvlk/blog/2021/09/du-lich-anh-8-1024x576.jpg?tr=dpr-2,w-675"
            className={cx("img")}
          />
          <span className={cx("name")}>Nguyen Mai Viet Dy</span>
          <span className={cx("role")}>Customer</span>
          <div className={cx("feedback-switch")}>
            <span className={cx("switch")}></span>
            <span className={cx("switch")}></span>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomeMember;
