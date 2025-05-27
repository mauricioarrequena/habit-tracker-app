import styles from "../styles/components/Layout.module.css";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 576) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.outergrid}>
      <div className={styles.header}>
        <div className={styles.header__title}>
          <span
            className={`material-symbols-outlined ${styles.menuIcon}`}
            onClick={() => setIsSidebarOpen(true)}
          >
            menu
          </span>
          <div className={styles.headerText}>
            <span className="">Habit Tracker</span>
            <span className="">Current Page</span>
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <>
          <div
            className={styles.mobileOverlay}
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className={`${styles.mobileSidebar} ${styles.show}`}>
            <Sidebar />
          </div>
        </>
      )}
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className={styles["page-inner"]}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
