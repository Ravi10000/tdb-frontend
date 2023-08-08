import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.scss";
import { navbarItems } from "src/data/navbar-items";
import { HashLink } from "react-router-hash-link";
import { useBookNow } from "src/context/book-now.context";
function Navbar() {
  const navigate = useNavigate();
  const { openBookNow } = useBookNow();
  return (
    <nav className={styles.navbar}>
      {navbarItems?.map((item) => (
        <HashLink
          key={item.name}
          className="__highlightOnHover"
          to={item?.path}
          onClick={() => {
            if (item?.name.toLowerCase() === "book now") {
              openBookNow();
            }
          }}
          // onClick={() => navigate(item.path)}
        >
          {item.name}
        </HashLink>
      ))}
    </nav>
  );
}

export default Navbar;
