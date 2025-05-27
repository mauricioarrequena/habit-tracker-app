import styles from "../styles/components/HabitCard.module.css";
import type { Habit } from "../Types/Habit";

const daysLabels: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sataturday",
  "Sunday",
];

interface HabitCardProp {
  habit: Habit
  onToggleDay: (day: string) => void;
  onEditHabitCard: (habit: Habit) => void;
}

export default function HabitCard({
  habit,
  onToggleDay,
  onEditHabitCard,
}: HabitCardProp) {

  return (
    <div className={styles.card}>
      <div
        className={styles.card__header}
        style={
          {
            "--card-color": habit.color,
          } as React.CSSProperties
        }
      >
        <div className={styles.card__header__title}>
          <span className={styles.title}>{habit.name}</span>
          <span
            className={`material-symbols-outlined 
            ${styles.starIcon} 
            ${habit.completed ? styles.starIconShown : ""}`}
          >
            stars
          </span>
        </div>
        <div className={styles.header__controls}>
          <span
            className={`material-symbols-outlined ${styles.editIcon}`}
            onClick={() => onEditHabitCard(habit)}
          >
            edit
          </span>
          <span className={`material-symbols-outlined ${styles.deleteIcon}`}>
            close
          </span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.checboxList}>
          {daysLabels.map((dayLabel, index) => {
            return (
              <label key={index} className={styles.checkbox}>
                <span className={styles.checkboxLabel}>{dayLabel[0]}</span>
                <input
                  type="checkbox"
                  checked={habit.completedDays.includes(dayLabel)}
                  className={styles.checkboxInput}
                  onChange={() => onToggleDay(dayLabel)}
                />
                <span
                  className={styles.checkboxCustom}
                  style={
                    {
                      "--card-color": habit.color,
                    } as React.CSSProperties
                  }
                ></span>
              </label>
            );
          })}
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressBar__track}>
            <div
              className={styles.progressBar__fill}
              style={
                {
                  "--card-color": habit.color,
                  "--progress": `${(habit.completedDays.length / 7) * 100}%`,
                } as React.CSSProperties
              }
            ></div>
          </div>
          <span className={styles.progressBar__label}>
            {habit.completedDays.length}/7 days completed
          </span>
        </div>
      </div>
    </div>
  );
}
