import styles from "./header.module.scss";
import logo from "#assets/images/logos/tdb-logo.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// icons
import { AiOutlineMenu } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { BsBag } from "react-icons/bs";
// import UserSvg from "#assets/icons/user.svg";
// import ShopSvg from "#assets/icons/shop.svg";
// import SearchSvg from "#assets/icons/search.svg";

// components
import Sidebar from "#components/sidebar/sidebar";
import Navbar from "#components/navbar/navbar";

function Header() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {isSidebarOpen && <Sidebar close={() => setIsSidebarOpen(false)} />}
        <div className={`${styles.subMenu} ${styles.leftMenu}`}>
          <AiOutlineMenu
            className={styles.icon}
            onClick={() => {
              setIsSidebarOpen(true);
            }}
          />
          <RiSearchLine className={styles.icon} />
        </div>
        <img
          className={styles.logo}
          src={logo}
          alt="the district barbers"
          onClick={() => navigate("/")}
        />
        <div className={`${styles.subMenu} ${styles.rightMenu}`}>
          <CiUser className={styles.icon} />
          <BsBag className={styles.icon} />
        </div>
      </header>
      <Navbar />
    </div>
  );
}

export default Header;
