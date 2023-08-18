import styles from "./with-popup.module.scss";

import { useEffect, useRef } from "react";
import { MdCancel, MdClose, MdSave } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";

import WithBackdrop from "#components/with-backdrop/with-backdrop";
import CustomButton from "#components/custom-button/custom-button";

function WithPopup({
  children,
  title,
  subtitle,
  saveBtnText,
  close,
  isSubmitting,
  cancelBtnText,
  onSubmitTry,
}) {
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClosePopup(e) {
      if (popupRef?.current && !popupRef.current.contains(e.target)) {
        close();
      }
    }
    addEventListener("mousedown", handleClosePopup);
    return () => {
      removeEventListener("mousedown", handleClosePopup);
    };
  }, [popupRef]);
  return (
    <WithBackdrop>
      <div className={styles.withPopup} ref={popupRef}>
        <div className={styles.head}>
          {title && <div className={styles.title}>{title}</div>}
          <MdClose className={styles.closePopup} onClick={close} />
        </div>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
        <div className={styles.btnsContainer}>
          <CustomButton
            type="submit"
            disabled={isSubmitting}
            onClick={() => onSubmitTry && onSubmitTry()}
          >
            {saveBtnText || (
              <>
                {isSubmitting ? (
                  <BiLoaderAlt className="__icon __loader" />
                ) : (
                  <MdSave className="__icon" />
                )}
                <p>save</p>{" "}
              </>
            )}
          </CustomButton>
          <CustomButton
            outlined
            onClick={close}
            type="button"
            disabled={isSubmitting}
          >
            {cancelBtnText || (
              <>
                <MdCancel className="__icon" />
                <p>cancel</p>
              </>
            )}
          </CustomButton>
        </div>
      </div>
    </WithBackdrop>
  );
}

export default WithPopup;
