import styles from "./sidebar.module.scss";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { navbarItems } from "src/data/navbar-items";

function Sidebar({ close }) {
  const [isClosing, setIsClosing] = useState(false);
  useEffect(() => {
    return () => {
      setIsClosing(false);
    };
  }, []);
  return (
    <div
      className={`${styles.sidebarContainer} ${isClosing && styles.closing}`}
    >
      <nav className={styles.sidebar}>
        <RxCross1
          className={styles.close}
          onClick={() => {
            setIsClosing(true);
            setTimeout(() => {
              close();
            }, 500);
          }}
        />
        {navbarItems?.map((item) => (
          <li key={item} className="__highlightOnHover">
            {item}
          </li>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;