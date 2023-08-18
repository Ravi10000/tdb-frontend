import styles from "./admin-sidebar.module.scss";
import { sidebarOptions } from "#data/sidebar-options";
import { useLocation, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import logoLg from "#assets/images/logos/tdb-logo-lg.png";

function AdminSidebar({ close, open, isSidebarVisible }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);

  function closeSidebar() {
    setIsClosing(true);
    setTimeout(() => {
      close();
    }, 500);
  }
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.togglerContainer}>
        <AiOutlineMenu
          className={styles.showMenuIcon}
          onClick={() => {
            open();
            setIsClosing(false);
          }}
        />
      </div>
      {isSidebarVisible && (
        <div
          className={`${styles.adminSidebar} ${
            isClosing ? styles.closing : styles.open
          }`}
        >
          <RxCross1 className={styles.cross} onClick={closeSidebar} />
          <div className={styles.optionsContainer}>
            <img
              src={logoLg}
              alt="the district barbers"
              className={styles.logo}
            />
            {sidebarOptions.map((option) => (
              <div
                key={option.path}
                onClick={() => {
                  navigate(option.path);
                  closeSidebar();
                }}
                className={`${styles.option} ${
                  pathname === option?.path ? styles.active : ""
                }`}
              >
                <p>{option.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={`${styles.adminSidebar} ${styles.sticky}`}>
        <div className={styles.optionsContainer}>
          <img
            onClick={() => navigate("/")}
            src={logoLg}
            alt="the district barbers"
            className={styles.logo}
          />
          {sidebarOptions.map((option) => (
            <div
              key={option.path}
              onClick={() => {
                navigate(option.path);
                closeSidebar();
              }}
              className={`${styles.option} ${
                pathname === option?.path ? styles.active : ""
              }`}
            >
              <p>{option.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
