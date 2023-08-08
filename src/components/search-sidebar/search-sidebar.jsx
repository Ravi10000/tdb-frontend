import styles from "./search-sidebar.module.scss";
import SearchInput from "#components/search-input/search-input";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function SearchSidebar({ close }) {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
      setIsClosing(false);
    };
  }, []);
  return (
    <div
      className={`${styles.searchSidebarContainer} ${
        isClosing && styles.closing
      }`}
    >
      <div className={styles.sidebar}>
        <SearchInput />
      </div>
      <RxCross1
        className={styles.close}
        onClick={() => {
          setIsClosing(true);
          setTimeout(() => {
            close();
          }, 500);
        }}
      />
    </div>
  );
}

export default SearchSidebar;
