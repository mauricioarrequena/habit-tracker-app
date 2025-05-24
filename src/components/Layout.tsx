import styles from "../styles/components/Layout.module.css"
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className={styles.outergrid}>
      <div className={styles.header}>
        <span>Header</span>
      </div>
      <div className={styles.sidebar}>
        <span>sidebar</span>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );

}