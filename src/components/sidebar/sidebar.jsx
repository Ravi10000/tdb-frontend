import styles from "./sidebar.module.scss";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { navbarItems } from "src/data/navbar-items";
import { HashLink } from "react-router-hash-link";
import { useBookNow } from "src/context/book-now.context";

function Sidebar({ close }) {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);
  const { openBookNow } = useBookNow();

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
  return (
    <div
      className={`${styles.sidebarContainer} ${isClosing && styles.closing}`}
    >
      <nav className={styles.sidebar}>
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
