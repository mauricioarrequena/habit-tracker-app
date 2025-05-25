import styles from "../styles/components/ResetHabits.module.css";

interface ResetHabitsProps {
  onClickReset: () => void;
}

export default function ResetHabits( { onClickReset }: ResetHabitsProps) {
  return (<div className={styles.resetHabits}>
    <div className={styles.title}>
      <span className={styles.title__text}>Habit tracker</span>
      <span className={styles.title__description}>Track your daily habits and build consistency</span>
    </div>
    <div>
      <button className={styles.button} onClick={onClickReset}>Reset</button>
    </div>
  </div>
  );

}