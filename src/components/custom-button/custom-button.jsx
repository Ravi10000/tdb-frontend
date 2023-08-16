import styles from "./custom-button.module.scss";
function CustomButton({ children, fit, ...otherProps }) {
  return (
    <button
      className={`${styles.button} ${fit ? styles.fit : ""}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default CustomButton;
