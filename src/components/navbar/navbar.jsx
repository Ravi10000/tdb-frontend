import styles from "./navbar.module.scss";
import { navbarItems } from "src/data/navbar-items";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      {navbarItems?.map((item) => (
        <li key={item} className="__highlightOnHover">
          {item}
        </li>
      ))}
    </nav>
  );
}

export default Navbar;
