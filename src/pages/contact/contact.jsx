import styles from "./contact.module.scss";
import { TfiLineDashed } from "react-icons/tfi";
import logo from "#assets/images/logos/tdb-logo.png";
import ShopInfo from "#components/shop-info/shop-info";
import designDestrictImg from "#assets/images/shop/design-district.jpg";
import somaDestrictImg from "#assets/images/shop/soma-district.jpg";

function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <div className={styles.shops}>
        <div className={styles.shop}>
          <div className={styles.address}>
            <div className={styles.head}>
              <img
                className={styles.logo}
                src={logo}
                alt="the discrict barbers"
              />
              <p>DESIGN DISTRICT</p>
            </div>
            <div className={styles.info}>
              <a
                className={styles.directionLink}
                href="https://www.google.com/maps/place/The+District+Barbers+-+Design+District/@37.7713935,-122.4076807,17z/data=!4m15!1m8!3m7!1s0x808f7e2c70db120b:0xfd068d7fb1853940!2s897+Brannan+St,+San+Francisco,+CA+94103,+USA!3b1!8m2!3d37.7713893!4d-122.4051004!16s%2Fg%2F11pysc4wmt!3m5!1s0x808f7ff50b8a2e49:0xffe9308435ef765a!8m2!3d37.7713893!4d-122.4051004!16s%2Fg%2F11h51d7chl?entry=ttu"
                target="_blank"
              >
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
            {/* <img src="/home-hero.jpg" alt="test image" /> */}
            <img src={designDestrictImg} alt="test image" />
          </div>
        </div>
        <div className={styles.shop}>
          <div className={styles.address}>
            <div className={styles.head}>
              <img
                className={styles.logo}
                src={logo}
                alt="the discrict barbers"
              />
              <p>SOMA DISTRICT</p>
            </div>
            <div className={styles.info}>
              <a
                className={styles.directionLink}
                href="https://www.google.com/maps/place/The+District+Barbers+-+Soma+District/@37.7838781,-122.3984911,17z/data=!4m15!1m8!3m7!1s0x8085807c2d60c585:0x57656c03bf77c09b!2s333+3rd+St+%23201,+San+Francisco,+CA+94107,+USA!3b1!8m2!3d37.7838781!4d-122.3984911!16s%2Fg%2F11rxcvwy33!3m5!1s0x8085807c297ee941:0x2d13feb0bb888a7c!8m2!3d37.7838781!4d-122.3984911!16s%2Fg%2F11ckthj2l8?entry=ttu"
                target="_blank"
              >
                Directions
              </a>
              <p>333 3rd St.Suite 201, San Francisco CA, 94107</p>
              <p>415.800.7325</p>
              <p>Thursday-Friday 10am-7pm, Saturday 9am-3pm</p>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src={somaDestrictImg} alt="test image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
