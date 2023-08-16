import styles from "./sidebar.module.scss";
import { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { navbarItems } from "src/data/navbar-items";
import { HashLink } from "react-router-hash-link";
import { useBookNow } from "src/context/book-now.context";

function Sidebar({ close }) {
  const [isClosing, setIsClosing] = useState(false);
  const { openBookNow } = useBookNow();
  const sidebarRef = useRef(null);
  function closeSidebar() {
    setIsClosing(true);
    setTimeout(() => {
      close();
    }, 500);
  }
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
      if (sidebarRef.current && !sidebarRef.current.contains(e.target))
        closeSidebar();
    }
    addEventListener("mousedown", handleCloseSidebar);
    return () => {
      document.body.style.overflow = "unset";
      setIsClosing(false);
      removeEventListener("click", handleCloseSidebar);
    };
  }, [sidebarRef]);
  return (
    <div
      className={`${styles.sidebarContainer} ${isClosing && styles.closing}`}
    >
      <nav className={styles.sidebar} ref={sidebarRef}>
        <RxCross1 className={styles.close} onClick={closeSidebar} />
        {navbarItems?.map((item) => (
          <HashLink
            key={item.name}
            className="__highlightOnHover"
            to={item?.path}
            onClick={() => {
              if (item?.name.toLowerCase() === "book now") {
                openBookNow();
              }
              closeSidebar();
            }}
          >
            {item.name}
          </HashLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
