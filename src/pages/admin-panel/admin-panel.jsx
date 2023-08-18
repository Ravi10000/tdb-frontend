import styles from "./admin-panel.module.scss";
import AdminSidebar from "#layouts/admin-sidebar/admin-sidebar";
import { lazy, useState } from "react";
import { useLocation } from "react-router-dom";
const ProductManagement = lazy(() =>
  import("#pages/product-management/product-management")
);
function AdminPanel() {
  const { pathname } = useLocation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const closeSidebar = () => setIsSidebarVisible(false);
  const openSidebar = () => setIsSidebarVisible(true);
  return (
    <div className={styles.adminPanel}>
      <AdminSidebar
        close={closeSidebar}
        open={openSidebar}
        isSidebarVisible={isSidebarVisible}
      />
      {/* <section className={styles.contentPanel}>

      </section> */}
    </div>
  );
}

export default AdminPanel;
