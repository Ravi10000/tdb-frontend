import styles from "./search-sidebar.module.scss";
import SearchInput from "#components/search-input/search-input";
import { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useForm } from "react-hook-form";

function SearchSidebar({ close }) {
  const [isClosing, setIsClosing] = useState(false);
  const searchSidebarRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const query = watch("query");
  const handleSearch = (data) => {
    console.log(data);
  };
  const closeSidebar = () => {
    setIsClosing(true);
    setTimeout(() => {
      close();
    }, 500);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
      setIsClosing(false);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    function handleCloseSidebar(e) {
      if (
        searchSidebarRef.current &&
        !searchSidebarRef.current.contains(e.target)
      )
        closeSidebar();
    }
    addEventListener("mousedown", handleCloseSidebar);
    return () => {
      document.body.style.overflow = "unset";
      setIsClosing(false);
      removeEventListener("click", handleCloseSidebar);
    };
  }, [searchSidebarRef]);
  return (
    <div
      className={`${styles.searchSidebarContainer} ${
        isClosing && styles.closing
      }`}
    >
      <form
        className={styles.sidebar}
        ref={searchSidebarRef}
        onSubmit={handleSubmit(handleSearch)}
      >
        <SearchInput register={{ ...register("query") }} />
        {query?.length > 2 && (
          <div className={styles.buttonContainer}>
            <button className={styles.searchButton}>SEE ALL RESULTS</button>
          </div>
        )}
      </form>
      <RxCross1 className={styles.close} onClick={closeSidebar} />
    </div>
  );
}

export default SearchSidebar;
