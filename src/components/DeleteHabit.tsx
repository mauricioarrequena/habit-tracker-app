import styles from "../styles/components/DeleteHabit.module.css";

interface DeleteHabitProps {
  onClickCancel: () => void;
  onClickConfirm: () => void;
}
export default function DeleteHabit({
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
          <button className={styles.btnConfirm} onClick={onClickConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
