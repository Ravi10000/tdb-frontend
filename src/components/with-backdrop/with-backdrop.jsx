import styles from "./with-backdrop.module.scss";

import React, { useEffect, useRef } from "react";

export default function WithBackdrop({ children }) {
  const backdropRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    backdropRef.current.style.overflowY = "scroll";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={styles.backdrop} ref={backdropRef}>
      {children}
    </div>
  );
}
