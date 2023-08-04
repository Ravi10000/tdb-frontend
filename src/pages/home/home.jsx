import styles from "./home.module.scss";
import heroVideo from "#assets/videos/home-hero-video.mp4";
import VideoPlayer from "#components/video-player/video-player";
import HomePageProducts from "#components/home-page-products/home-page-products";
import Gallery from "#components/gallery/gallery";

function HomePage() {
  return (
    <div className={styles.homePage}>
      <section className={styles.heroSection}>
        <div className={styles.heroVideo}>
          <VideoPlayer src={heroVideo} />
        </div>
      </section>
      <h1 className={`__highlightOnHover ${styles.bookLink}`}>
        BOOK AN APPOINTMENT
      </h1>
      <h2 className={styles.subtitle}>#goodvibes</h2>
      <HomePageProducts />
    </div>
  );
}

export default HomePage;
