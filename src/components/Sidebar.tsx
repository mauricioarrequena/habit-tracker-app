import styles from "../styles/components/Sidebar.module.css";
import { Link } from "react-router";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        <li className={styles.item}>
          <Link className={styles.navButton} to="/">
            Dashboard
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.navButton} to="/settings">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
