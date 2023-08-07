import styles from "./footer.module.scss";
import { footerInfo } from "src/data/footer-info";

function Footer() {
  return (
    <footer className={styles.footer}>
      {footerInfo.map((menu) => (
        <div key={menu.name} className={styles.menu}>
          <h4 className={styles.menuHeading}>{menu.name}</h4>
          {menu.options.map((option) => (
            <p className={styles.menuItem} key={option.name}>
              {option.name}
            </p>
          ))}
        </div>
      ))}
    </footer>
  );
}

export default Footer;
