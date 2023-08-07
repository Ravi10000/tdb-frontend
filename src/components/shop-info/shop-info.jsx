import styles from "./shop-info.module.scss";
import { TfiLineDashed } from "react-icons/tfi";
import logo from "#assets/images/logos/tdb-logo.png";
import logoLarge from "#assets/images/logos/tdb-logo-lg.png";

function ShopInfo({ shop }) {
  return (
    <div className={styles.shop}>
      <div className={styles.address}>
        <div className={styles.head}>
          <img className={styles.logo} src={logo} alt="the discrict barbers" />
          <p>DESIGN DISTRICT</p>
        </div>
        <div className={styles.info}>
          <a href="#" className={styles.directionLink}>
            Directions
          </a>
          <p>897 Brannan St, San Francisco CA, 94103</p>
          <p>415.814.2436</p>
          <p>Monday-Friday 9am-7pm, Saturday 8:30am-3pm</p>
          <p className={styles.highlight}>Razor Bar</p>
          <p>Thursday-Friday 5pm-10pm, Saturday 4pm-11pm</p>
        </div>
        <TfiLineDashed />
        <p>Wine & Beer Only</p>
      </div>
      <div className={styles.imageContainer}>
        <img src="/home-hero.jpg" alt="test image" />
      </div>
    </div>
  );
}

export default ShopInfo;
