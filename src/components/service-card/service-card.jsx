import styles from "./service-card.module.scss";
import logo from "#assets/images/logos/tdb-logo.png";
function ServiceCard({ service: { image, title } }) {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.card}>
        <img className={styles.logo} src={logo} alt="" />
        <img className={styles.image} src={image} alt={title} />
      </div>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
}

export default ServiceCard;
