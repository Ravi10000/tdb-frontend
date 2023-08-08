import styles from "./book-now.module.scss";
import { useEffect, useRef, useState } from "react";
import { useBookNow } from "src/context/book-now.context";
import testImage from "#assets/images/shop/design-district.jpg";
import LocationSelector from "#components/location-selector/location-selector";
import BarberSelector from "#components/barber-selector/barber-selector";

function BookNow() {
  const [isClosing, setIsClosing] = useState(false);
  const bookNowRef = useRef(null);
  const { closeBookNow: close } = useBookNow();
  const [selectedLocation, setSelectedLocation] = useState(null);

  function closeBookNow() {
    setIsClosing(true);
    setTimeout(() => {
      close();
    }, 290);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function handleClosePopup(e) {
      if (bookNowRef.current && !bookNowRef.current.contains(e.target)) {
        closeBookNow();
      }
    }
    addEventListener("mousedown", handleClosePopup);
    return () => {
      document.body.style.overflow = "unset";
      setIsClosing(false);
      removeEventListener("click", handleClosePopup);
    };
  }, [bookNowRef]);
  return (
    <div
      className={`${styles.bookNow} ${isClosing && styles.closing}`}
      ref={bookNowRef}
    >
      {!selectedLocation ? (
        <LocationSelector
          closeBookNow={closeBookNow}
          setSelectedLocation={setSelectedLocation}
        />
      ) : (
        <BarberSelector
          closeBookNow={closeBookNow}
          setSelectedLocation={setSelectedLocation}
        />
      )}
    </div>
  );
}

export default BookNow;
