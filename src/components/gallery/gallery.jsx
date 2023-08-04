import styles from "./gallery.module.scss";
import logoLarge from "#assets/images/logos/tdb-logo-lg.png";
import { servicesInfo } from "#data/services-info";
import ServiceCard from "#components/service-card/service-card";

function Gallery() {
  return (
    <div className={styles.gallery}>
      <div className={styles.head}>
        <h1 className={styles.title}>GALLERY</h1>
        <img src={logoLarge} alt="the district barbers" />
        <p className={styles.subtitle}>
          An Expression of Our Taste, Style And Point of View
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.services}>
          {servicesInfo.map((service) => (
            <ServiceCard service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
