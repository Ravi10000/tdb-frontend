import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.scss";
import { navbarItems } from "src/data/navbar-items";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className={styles.navbar}>
      {navbarItems?.map((item) => (
        <li
          key={item.name}
          className="__highlightOnHover"
          onClick={() => navigate(item.path)}
        >
          {item.name}
        </li>
      ))}
    </nav>
  );
}

export default Navbar;
