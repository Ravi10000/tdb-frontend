import styles from "./delete-popup.module.scss";

import CustomButton from "#components/custom-button/custom-button";
import WithBackdrop from "#components/with-backdrop/with-backdrop";

function DeletePopup({
  title,
  subtitle,
  isDeleting,
  submitBtnText = "Yes, Delete",
  deleteFn,
  close,
}) {
  return (
    <WithBackdrop>
      <div className={styles.deletePopup}>
        <div className={styles.head}>
          {title && <h4>{title}</h4>}
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className={styles.buttons}>
          <CustomButton onClick={deleteFn} isLoading={isDeleting}>
            {submitBtnText}
          </CustomButton>
          <CustomButton outlined onClick={close}>
            No, Cancel
          </CustomButton>
        </div>
      </div>
    </WithBackdrop>
  );
}

export default DeletePopup;
