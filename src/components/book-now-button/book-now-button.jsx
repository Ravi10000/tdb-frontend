import styles from "./book-now-button.module.scss";
import BookNow from "#components/book-now/book-now";
import { useBookNow } from "src/context/book-now.context";

function BookNowButton() {
  const { isBookNowOpen, openBookNow } = useBookNow();
  return (
    <>
      {isBookNowOpen && <BookNow />}
      <button className={styles.bookNowButton} onClick={openBookNow}>
        BOOK NOW
      </button>
    </>
  );
}

export default BookNowButton;
