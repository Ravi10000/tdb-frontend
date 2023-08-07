import styles from "./sidebar.module.scss";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { navbarItems } from "src/data/navbar-items";

function Sidebar({ close }) {
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
          <li
            key={item.name}
            className="__highlightOnHover"
            onClick={() => {
              navigate(item.path);
              close();
            }}
          >
            {item.name}
          </li>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
