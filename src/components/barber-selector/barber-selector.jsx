import styles from "./barber-selector.module.scss";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineCardGiftcard } from "react-icons/md";
import { barberInfo } from "#data/barber-info";
import BarberCard from "#components/barber-card/barber-card";
import shuffleIcon from "#assets/icons/shuffle.png";
import giftCardIcon from "#assets/icons/gift-card.png";

function BarberSelector({ closeBookNow, setSelectedLocation }) {
  return (
    <div className={styles.barberSelector}>
      <div className={styles.head}>
        <div className={styles.left} onClick={() => setSelectedLocation(null)}>
          <IoIosArrowBack className={styles.backIcon} />
          <h4 className={styles.heading}>Choose a professional</h4>
        </div>
        <div className={styles.closeBtn} onClick={closeBookNow}>
          <RxCross1 className={styles.icon} />
        </div>
      </div>
      <div className={styles.barbersList}>
        <BarberCard
          any
          barber={{
            image: shuffleIcon,
            name: "Choose a service first",
            availableOn: "Book with any professional",
          }}
        />
        {barberInfo?.map((barber, index) => (
          <BarberCard barber={barber} key={index} />
        ))}
        <BarberCard
          any
          barber={{
            image: giftCardIcon,
            name: "Buy a gift card instead",
          }}
        />
      </div>
    </div>
  );
}

export default BarberSelector;
