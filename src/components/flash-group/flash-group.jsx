import styles from "./flash-group.module.scss";
import Flash from "../flash/flash";

function FlashGroup({ flashList }) {
  return (
    <section className={styles.flashGroup}>
      {flashList.reverse().map((flash) => (
        <Flash flash={flash} key={flash.id} />
      ))}
    </section>
  );
}

export default FlashGroup;
