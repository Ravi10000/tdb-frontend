import styles from "./location-card.module.scss";

function LocationCard({ locationInfo, setSelectedLocation }) {
  return (
    <div
      className={styles.locationCard}
      onClick={() => setSelectedLocation(locationInfo)}
    >
      <img src={locationInfo?.image} alt={locationInfo?.name} />
      <div className={styles.locationInfo}>
        <h3>{locationInfo?.name}</h3>
        <p>{locationInfo?.address}</p>
      </div>
    </div>
  );
}

export default LocationCard;
