import styles from "./custom-input.module.scss";
import { useId, useState } from "react";

function CustomInput({ label, error, otp, register, ...otherProps }) {
  const id = useId();
  const [show, setShow] = useState(false);
  function handleTooglePassword() {
    setShow((show) => !show);
  }

  return (
    <div className={styles.customInput}>
      <div className={styles.inputContainer}>
        <input
          className={`${styles.input} ${otp ? styles.otp : ""}`}
          id={id}
          {...register}
          {...otherProps}
          type={
            otherProps?.type === "password"
              ? show
                ? "text"
                : "password"
              : otherProps?.type
          }
        />
        {otherProps?.type === "password" && (
          <div onClick={handleTooglePassword} className={styles.toggleShow}>
            {show ? (
              <p className={styles.togglePassword}>hide</p>
            ) : (
              <p className={styles.togglePassword}>show</p>
            )}
          </div>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default CustomInput;
