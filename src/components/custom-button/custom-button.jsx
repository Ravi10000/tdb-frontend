import styles from "./custom-button.module.scss";
function CustomButton({ children, fit, outlined, isLoading, ...otherProps }) {
  return (
    <button
      className={`${styles.button} ${fit ? styles.fit : ""} ${
        outlined ? styles.outlined : ""
      }`}
      disabled={!!isLoading}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default CustomButton;
