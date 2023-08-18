import styles from "./status-select.module.scss";

function StatusSelect({ selected, setStatus }) {
  return (
    <div className={`${styles.status} `}>
      <label>
        <p>Status</p>
      </label>
      <div className={styles.optionsContainer}>
        <div
          onClick={() => setStatus("active")}
          className={`${styles.option} ${styles.active} ${
            selected === "active" && styles.selected
          }`}
        >
          active
        </div>
        <div
          onClick={() => setStatus("inactive")}
          className={`${styles.option} ${styles.inactive} ${
            selected === "inactive" && styles.selected
          }`}
        >
          inactive
        </div>
      </div>
    </div>
  );
}

export default StatusSelect;
