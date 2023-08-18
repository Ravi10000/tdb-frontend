import styles from "./custom-textarea.module.scss";
import { useId } from "react";

function CustomTextarea({
  error,
  text,
  large,
  label,
  register,
  ...otherProps
}) {
  const id = useId();
  console.log({ otherProps });

  return (
    <div className={`${styles.textareaContainer} ${large && styles.large}`}>
      <div className={styles.inputContainer}>
        <textarea
          className={styles.input}
          id={id}
          {...register}
          {...otherProps}
        ></textarea>
        {label && (
          <label
            className={`${styles.label} ${text?.length > 0 && styles.hide}`}
            htmlFor={id}
          >
            {label}
          </label>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default CustomTextarea;
