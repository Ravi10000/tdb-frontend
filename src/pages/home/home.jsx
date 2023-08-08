import styles from "./home.module.scss";
import heroVideo from "#assets/videos/home-hero-video.mp4";
import VideoPlayer from "#components/video-player/video-player";
import HomePageProducts from "#components/home-page-products/home-page-products";
import logo from "#assets/images/logos/tdb-logo.png";
import logoLarge from "#assets/images/logos/tdb-logo-lg.png";
import { useNavigate } from "react-router-dom";
import { useBookNow } from "src/context/book-now.context";
import promoVideo from "#assets/videos/promo.mp4";

function HomePage() {
  const navigate = useNavigate();
  const { openBookNow } = useBookNow();
  return (
    <div className={styles.homePage}>
      <section className={styles.heroSection}>
        <div className={styles.heroVideo}>
          <VideoPlayer src={promoVideo} />
        </div>
      </section>
      <h1
        className={`__highlightOnHover ${styles.bookLink}`}
        onClick={openBookNow}
      >
        BOOK AN APPOINTMENT
      </h1>
      <h2 className={styles.subtitle}>#goodvibes</h2>
      <HomePageProducts />
      <div className={styles.shopAt}>
        <div className={styles.shopHead}>
          <h2>SHOP at</h2>
          <img src={logo} alt="the district barbers" />
        </div>
        <div className={styles.shopItemContainer}>
          <VideoPlayer src={heroVideo}>
            <div className={styles.content}>
              <img src={logoLarge} alt="the district barbers" />
              <p>SELECTIVE WINES</p>
            </div>
          </VideoPlayer>
        </div>
        <div className={styles.subSection}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <img
                className={styles.logo}
                src={logo}
                alt="the district barbers"
              />
              <p>HAIR CARE</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <img
                className={styles.logo}
                src={logo}
                alt="the district barbers"
              />
              <p>APPAREL</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.afterShop}>
        <h2>NOT JUST MENTAL</h2>
        <div className={styles.afterShopContent}>
          <img
            className={styles.coverImage}
            src="/home-hero.jpg"
            alt="test image"
          />
          <img
            className={styles.logo}
            src={logoLarge}
            alt="the district barbers"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
