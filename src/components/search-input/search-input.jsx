import styles from "./search-input.module.scss";
import { useEffect, useRef } from "react";
import { RiSearchLine } from "react-icons/ri";

function SearchInput({ register, ...otherProps }) {
  const searchRef = useRef(null);
  useEffect(() => {
    searchRef?.current?.focus();
  }, [searchRef]);
  return (
    <div className={styles.searchInput}>
      <RiSearchLine className={styles.searchIcon} />
      <input
        type="text"
        placeholder="SEARCH"
        ref={searchRef}
        {...register}
        {...otherProps}
      />
    </div>
  );
}

export default SearchInput;
