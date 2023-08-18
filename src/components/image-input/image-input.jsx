import styles from "./image-input.module.scss";
import { BiImageAdd } from "react-icons/bi";

export default function ImageInput({
  round,
  isIcon,
  label,
  defaultValue,
  register,
  error,
  image,
  ...otherProps
}) {
  console.log({ image });
  return (
    <>
      <div
        className={`${styles["upload-img"]} 
        ${isIcon ? styles.iconInput : ""} 
        ${round && styles.round}`}
      >
        <div className={styles["upload-input"]}>
          {image ? (
            <img src={URL?.createObjectURL(image)} alt="image" />
          ) : defaultValue ? (
            <img
              src={`${
                import.meta.env.VITE_BASE_SERVER_URL
              }/images/${defaultValue}`}
              alt="image"
              onError={(e) => {
                e && (e.target.alt = "Error Loading " + label);
              }}
            />
          ) : (
            <label className={styles.label}>
              <BiImageAdd className={styles.addIcon} />
              {label}
            </label>
          )}

          <input
            className={styles["file-input"]}
            type="file"
            accept="image/*"
            {...register}
            {...otherProps}
          />
        </div>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
}
