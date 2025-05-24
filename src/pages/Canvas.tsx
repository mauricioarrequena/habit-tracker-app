import styles from "../styles/pages/Canvas.module.css";

import AddHabit from "../components/AddHabit"
export default function Canvas() {
  return (
    <div className={styles.canvas}>
      <AddHabit/>
    </div>
  )
}