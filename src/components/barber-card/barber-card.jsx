import styles from "./barber-card.module.scss";

function BarberCard({ barber, any }) {
  console.log(barber?.image);
  return (
    <div className={styles.barberCard}>
      <img src={barber?.image} alt={barber?.name} />
      <h4>{barber?.name}</h4>
      {!any && <div className={styles.seperator}></div>}
      <p>
        {!any && "Available"}
        <br />
        {barber?.availableOn}
      </p>
    </div>
  );
}

export default BarberCard;
