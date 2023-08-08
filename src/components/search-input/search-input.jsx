import styles from "./search-input.module.scss";
import { RiSearchLine } from "react-icons/ri";

function SearchInput() {
  return (
    <div className={styles.searchInput}>
      <RiSearchLine className={styles.searchIcon} />
      <input type="text" placeholder="SEARCH"/>
    </div>
  );
}

export default SearchInput;
