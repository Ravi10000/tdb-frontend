import { createContext, useContext, useState } from "react";

const BookNowContext = createContext();
export const useBookNow = () => useContext(BookNowContext);

export const BookNowProvider = ({ children }) => {
  const [isBookNowOpen, setIsBookNowOpen] = useState(false);
  const closeBookNow = () => setIsBookNowOpen(false);
  const openBookNow = () => setIsBookNowOpen(true);
  return (
    <BookNowContext.Provider
      value={{ isBookNowOpen, closeBookNow, openBookNow }}
    >
      {children}
    </BookNowContext.Provider>
  );
};
