// DeleteHabit.tsx
import styles from "../styles/components/DeleteHabit.module.css";

interface DeleteHabitProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteHabit({ onCancel, onConfirm }: DeleteHabitProps) {
  return (
    <div className={styles.canvas}>
      <div className={styles.dialogContainer}>
        <h2>Delete this habit?</h2>
        <div className={styles.dialogButtons}>
          <button className={styles.btnCancel} onClick={onCancel}>Cancel</button>
          <button className={styles.btnConfirm} onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
