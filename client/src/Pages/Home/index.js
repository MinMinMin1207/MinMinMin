// Import library
import classNames from "classnames/bind";

// Import component
import Navigation from "~/components/Navigation";
import images from "~/assets/images";
import Button from "~/components/Button";

// Import scss
import styles from "./Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Home() {
  return (
    <>
      {/* Header  */}
      <header className={cx("header")}>
        {/* Header top */}
        <div className={cx("header-top")}>
          <div className={cx("container")}>
            {/* Navigation */}
            <Navigation />
            {/* Hero */}
            <div className={cx("hero")}>
              {/* Hero left */}
              <div className={cx("hero-left")}>
                <div className={cx("hero-title")}>
                  Paws & Love: Unite. Cherish.
                </div>
                <div className={cx("hero-action")}>
                  <Button className={cx("button-hero", "button-black")}>
                    Learn more
                  </Button>
                  <Button className={cx("button-hero")}>
                    Make a reservation
                  </Button>
                </div>
              </div>
              {/* Hero right */}
              <div className="hero-right">
                <img
                  src={images.heroCat}
                  alt="Hero Cat"
                  className={cx("heroImg", "hero-cat")}
                />
                <img
                  src={images.heroDog}
                  style={{zIndex: "0", width: "400px", height: "350px", bottom: "-53px", right: "-50px"}}
                  alt="Hero Dog"
                  className={cx("heroImg", "hero-dog")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={cx("header-bottom")}>
          {/* Header bottom */}
          <div className={cx("header-bottom")}>
            <div className={cx("container")}>
              <h2 className={cx("heading")}>
                Dog Walking & Pet Sitting Services Throughout Ho Chi Minh City
              </h2>
              <div className={cx("reviews")}>
                <img src={images.yelpLogo} alt="YelpLogo" />
                <span>4,8 Yelp reviews</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Happy pets */}
      <main className={cx("main")}>
        <div className={cx("container")}>
          {/* Happy pets */}
          <div className={cx("happy-pets")}>
            <div className={cx("left")}></div>
            <div className={cx("right")}>
              <img src={images.happyDog} className={cx("happyDog")} alt="dog" />
              <img src={images.roundtext} className={cx("slogan")} alt="anh" />
              <h1 className={cx("heading")}>Happy pets, happy humans</h1>
              <p className={cx("desc")}>
                Come see how I’m styling these final days of summer with bright
                palettes and pops of color that will dazzle your wardrobe year
                round!
              </p>
              <p className={cx("desc")}>
                How I’m styling these final days of summer with bright palettes
                and pops of color that will dazzle your wardrobe year round!
              </p>
              <div className={cx("action")}>Learn more</div>
            </div>
          </div>
          {/* Service */}
          <div className={cx("service")}>
            <div className={cx("service-top")}>
              <div className={cx("service-title")}>
                <img src={images.serviceIntro} className={cx("img")} />
                <h2 className={cx("heading")}>We are best in:</h2>
              </div>
            </div>
            <div className={cx("service-body")}>
              {/* Service item */}
              <div className={cx("service-item")}>
                <div className={cx("service-box")}>
                  <img
                    src={images.serviceIcon01}
                    className={cx("service-icon")}
                    alt="Pet Walking"
                  />
                </div>
                <span className={cx("service-name")}>Pet Walking</span>
              </div>

              {/* Service item */}
              <div className={cx("service-item")}>
                <div className={cx("service-box")}>
                  <img
                    src={images.serviceIcon02}
                    className={cx("service-icon")}
                    alt="Bathing"
                  />
                </div>
                <span className={cx("service-name")}>Bathing</span>
              </div>

              {/* Service item */}
              <div className={cx("service-item")}>
                <div className={cx("service-box")}>
                  <img
                    src={images.serviceIcon03}
                    className={cx("service-icon")}
                    alt="Daycare"
                  />
                </div>
                <span className={cx("service-name")}>Daycare</span>
              </div>

              {/* Service item */}
              <div className={cx("service-item")}>
                <div className={cx("service-box")}>
                  <img
                    src={images.serviceIcon04}
                    className={cx("service-icon")}
                    alt="Training"
                  />
                </div>
                <span className={cx("service-name")}>Training</span>
              </div>

              {/* Service item */}
              <div className={cx("service-item")}>
                <div className={cx("service-box")}>
                  <img
                    src={images.serviceIcon05}
                    className={cx("service-icon")}
                    alt="Boarding"
                  />
                </div>
                <span className={cx("service-name")}>Boarding</span>
              </div>

              {/* Service item */}
              <div className={cx("service-item")}>
                <div className={cx("service-box")}>
                  <img
                    src={images.serviceIcon06}
                    className={cx("service-icon")}
                    alt="Grooming"
                  />
                </div>
                <span className={cx("service-name")}>Grooming</span>
              </div>
            </div>
          </div>
          {/* Reason */}
          <div className={cx("reason")}>
            <h2 className={cx("reason-heading")}>Why rely on us?</h2>
            <div className={cx("reason-body")}>
              {/* Image reason */}
              <img
                src={images.reason}
                alt="reason"
                className={cx("reason-img")}
              />

              {/* Reson left */}
              <div className={cx("reason-left")}>
                {/* Reson item */}
                <div className={cx("reason-item")}>
                  <img
                    src={images.iconPets}
                    alt="icon"
                    className={cx("reason-icon")}
                  />
                  <div className={cx("reason-content")}>
                    <h3 className={cx("reason-title")}>We love pets</h3>
                    <p className={cx("reason-desc")}>
                      We understand that your furry friend is a treasured member
                      of your family and deserves the best care and attention
                      possible.
                    </p>
                  </div>
                </div>
                {/* Reson item */}
                <div className={cx("reason-item")}>
                  <img
                    src={images.iconPets}
                    alt="icon"
                    className={cx("reason-icon")}
                  />
                  <div className={cx("reason-content")}>
                    <h3 className={cx("reason-title")}>We love pets</h3>
                    <p className={cx("reason-desc")}>
                      We understand that your furry friend is a treasured member
                      of your family and deserves the best care and attention
                      possible.
                    </p>
                  </div>
                </div>
                {/* Reson item */}
                <div className={cx("reason-item")}>
                  <img
                    src={images.iconPets}
                    alt="icon"
                    className={cx("reason-icon")}
                  />
                  <div className={cx("reason-content")}>
                    <h3 className={cx("reason-title")}>We love pets</h3>
                    <p className={cx("reason-desc")}>
                      We understand that your furry friend is a treasured member
                      of your family and deserves the best care and attention
                      possible.
                    </p>
                  </div>
                </div>
              </div>
              {/* Reson right */}
              <div className={cx("reason-right")}>
                {/* Reson item */}
                <div className={cx("reason-item")}>
                  <img
                    src={images.iconPets}
                    alt="icon"
                    className={cx("reason-icon")}
                  />
                  <div className={cx("reason-content")}>
                    <h3 className={cx("reason-title")}>We love pets</h3>
                    <p className={cx("reason-desc")}>
                      We understand that your furry friend is a treasured member
                      of your family and deserves the best care and attention
                      possible.
                    </p>
                  </div>
                </div>
                {/* Reson item */}
                <div className={cx("reason-item")}>
                  <img
                    src={images.iconPets}
                    alt="icon"
                    className={cx("reason-icon")}
                  />
                  <div className={cx("reason-content")}>
                    <h3 className={cx("reason-title")}>We love pets</h3>
                    <p className={cx("reason-desc")}>
                      We understand that your furry friend is a treasured member
                      of your family and deserves the best care and attention
                      possible.
                    </p>
                  </div>
                </div>
                {/* Reson item */}
                <div className={cx("reason-item")}>
                  <img
                    src={images.iconPets}
                    alt="icon"
                    className={cx("reason-icon")}
                  />
                  <div className={cx("reason-content")}>
                    <h3 className={cx("reason-title")}>We love pets</h3>
                    <p className={cx("reason-desc")}>
                      We understand that your furry friend is a treasured member
                      of your family and deserves the best care and attention
                      possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Client say */}
          <div className={cx("clients-say")}>
            <h1 className={cx("client-heading")}>Clients say: </h1>
            <div className={cx("client-body")}>
              <div className={cx("client-box")}>
                <img
                  src={images.clientImg}
                  alt="clientImg"
                  className={cx("client-img")}
                />
                <div className={cx("client-content")}>
                  <h3 className={cx("client-title")}>Hao, Molly’s dog:</h3>
                  <p className={cx("client-desc")}>
                    Kind friendly and professional, and best of all Hao
                    absolutely loved them. I would recommend CatDogLover to
                    anyone looking for dog care.
                  </p>
                  <div className={cx("client-footer")}>
                    <div className={cx("reviews")}>
                      <img
                        src={images.yelpLogo}
                        alt="YelpLogo"
                        className={cx("logo")}
                      />
                      <span>4,8 Yelp reviews</span>
                    </div>
                    <div className={cx("reviews")}>
                      <img
                        src={images.yelpLogo}
                        alt="YelpLogo"
                        className={cx("logo")}
                      />
                      <span>4,8 Yelp reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("arrow", "arrow-left")}>
              <FontAwesomeIcon icon={faAngleRight} className={cx("icon")} />
            </div>
            <div className={cx("arrow", "arrow-right")}>
              <FontAwesomeIcon icon={faAngleLeft} className={cx("icon")} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
