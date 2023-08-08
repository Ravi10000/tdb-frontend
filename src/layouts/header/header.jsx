import styles from "./header.module.scss";
import logo from "#assets/images/logos/tdb-logo.png";

import { useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom";
import SearchSidebar from "#components/search-sidebar/search-sidebar";

function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className={`${styles.container} ${isHome && styles.home}`}>
      <header className={styles.header}>
        {isSidebarOpen && <Sidebar close={() => setIsSidebarOpen(false)} />}
        {isSearchOpen && <SearchSidebar close={() => setIsSearchOpen(false)} />}
        <div className={`${styles.subMenu} ${styles.leftMenu}`}>
          <AiOutlineMenu
            className={styles.icon}
            onClick={() => {
              setIsSidebarOpen(true);
            }}
          />
          <RiSearchLine
            className={styles.icon}
            onClick={() => setIsSearchOpen(true)}
          />
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
      {isHome && <Navbar />}
    </div>
  );
}

export default Header;
