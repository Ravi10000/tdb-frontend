import styles from "./home-page-products.module.scss";
import logo from "#assets/images/logos/tdb-logo.png";
import logoLarge from "#assets/images/logos/tdb-logo-lg.png";

// import heroVideo from "#assets/videos/promo.mp4";
import VideoPlayer from "#components/video-player/video-player";
import Gallery from "#components/gallery/gallery";
import { useBookNow } from "src/context/book-now.context";

function HomePageProducts({ video }) {
  const { openBookNow } = useBookNow();
  return (
    <div className={styles.products}>
      <div className={styles.product}>
        <VideoPlayer src={video}>
          <h1 className={styles.contentText} onClick={openBookNow}>
            BOOK AN APPOINTMENT
          </h1>
        </VideoPlayer>
      </div>
      <div className={styles.product}>
        <VideoPlayer src={video}>
          <img
            src={logo}
            alt="the district barbers"
            className={styles.contentImage}
          />
        </VideoPlayer>
      </div>
      <Gallery />
      <div className={styles.product}>
        <VideoPlayer src={video}>
          <div className={styles.content}>
            <h1 className={styles.contentText}>RAZOR BAR at</h1>
            <img
              src={logoLarge}
              alt="the district barbers"
              className={styles.contentImage}
            />
          </div>
        </VideoPlayer>
      </div>
    </div>
  );
}

export default HomePageProducts;
