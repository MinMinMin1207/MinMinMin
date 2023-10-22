import classNames from "classnames/bind";
import Header from "~/components/Layout/HeaderMember";
import Footer from "~/components/Layout/FooterMember";
import images from "~/assets/images";
import BoxProduct from "~/components/Product/BoxProduct/boxProduct";
import ListProduct from "~/components/Product/ListProduct/ListProduct";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

import styles from "./Shopping.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Shopping() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get("http://localhost:3000/products");
      setPets(res.data.data);
    }
    fetchData();
  }, []);

  console.log(pets);

  const handlePageClick = () => {};

  const [activeMenu, setActiveMenu] = useState(true);

  const leftMenu = () => {
    setActiveMenu(true);
  };
  const rightMenu = () => {
    setActiveMenu(false);
  };

  return (
    <div className={cx("shop-wrapper")}>
      {/* Header */}
      <Header />
      {/* Hero */}
      <div className={cx("shopping-hero")}>
        <h2 className={cx("heading")}>SHOPPING</h2>
        <span>
          <span>Home - </span>
          <span className={cx("title")}>Shopping</span>
        </span>
      </div>
      {/* Main */}
      <main className={cx("main")}>
        {/* Main header */}
        <div className={cx("main-header")}>
          {/* Left */}
          <div className={cx("left")}>
            <div
              className={cx("menu", "menu-one", {
                active: activeMenu === true,
              })}
              onClick={leftMenu}
            >
              <FontAwesomeIcon icon={faTableCellsLarge} />
            </div>
            <div
              className={cx("menu", "menu-two", {
                active: activeMenu === false,
              })}
              onClick={rightMenu}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
            <span className={cx("result-search")}>
              Showing 1 - 12 of 1000 results
            </span>
          </div>
          {/* Right */}
          <div className={cx("right")}>
            <span>Short By:</span>
            <input list="data" className={cx("input-sort")} />
            <datalist id="data">
              <option className={cx("text")}>Short by Default</option>
            </datalist>
          </div>
        </div>

        {/* Shopping */}

        <div className={cx("main-content")}>
          {/* Store content */}
          {activeMenu === true && (
            <div className={cx("shopping-list")}>
              {pets.map((item, index) => {
                return (
                  <Link to={`/product/${item.id}`}>
                    <BoxProduct
                      key={index}
                      img={`http://localhost:3000/${item.image}`}
                      title={item.productName}
                      rate={item.species}
                      price={item.price}
                      tag={item.size}
                    />
                  </Link>
                );
              })}
            </div>
          )}
          {/* Shopping content */}
          {activeMenu === false && (
            <div className={cx("shopping-list-menu")}>
              {pets.map((item, index) => {
                return (
                  <ListProduct
                    id={item.id}
                    key={index}
                    img={`http://localhost:3000/${item.image}`}
                    title={item.productName}
                    rate={item.species}
                    price={item.price}
                    tag={item.size}
                    desc={item.post.content}
                  />
                );
              })}
            </div>
          )}
          <div className={cx("shop-page")}>
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={69}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName={cx("pagination")}
              previousLinkClassName={cx("pagination__link")}
              nextLinkClassName={cx("pagination__link")}
              disabledClassName={cx("pagination__link--disabled")}
              activeClassName={cx("pagination__link--active")}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Shopping;
