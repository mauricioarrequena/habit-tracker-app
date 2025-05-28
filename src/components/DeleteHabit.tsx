import styles from "../styles/components/DeleteHabit.module.css";
import type { Habit } from "../Types/Habit";

interface DeleteHabitProps {
  habit: Habit
  onClickCancel: () => void;
  onClickConfirm: (habit: Habit) => void;
}
export default function DeleteHabit({
  habit,
  onClickCancel,
  onClickConfirm,
}: DeleteHabitProps) {
  return (
    <div className={styles.canvas}>
      <div className={styles.dialogContainer}>
        <h2>Delete this habit?</h2>
        <div className={styles.dialogButtons}>
          <button className={styles.btnCancel} onClick={onClickCancel}>
            Cancel
          </button>
          <button className={styles.btnConfirm} onClick={() => onClickConfirm(habit)}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
