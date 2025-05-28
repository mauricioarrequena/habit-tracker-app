import styles from "../styles/components/HabitCard.module.css";
import type { Habit } from "../Types/Habit";
import dayNames from "../data/Days";

interface HabitCardProp {
  habit: Habit;
  onChangeDayToggle: (day: string, habit: Habit) => void;
  onClickEdit: (habit: Habit) => void;
  onClickDelete: (habit: Habit) => void;
}
export default function HabitCard({
  habit,
  onChangeDayToggle,
  onClickEdit,
  onClickDelete,
}: HabitCardProp) {
  return (
    <div className={styles["card"]}>
      <div
        className={styles["card__header"]}
        style={
          {
            "--card-color": habit.hexColor,
          } as React.CSSProperties
        }
      >
        <div className={styles["card__header__title"]}>
          <span className={styles["title"]}>{habit.name}</span>
          <span
            className={`material-symbols-outlined 
            ${styles["starIcon"]} 
            ${habit.completed ? styles["starIconShown"] : ""}`}
          >
            stars
          </span>
        </div>
        <div className={styles["header__controls"]}>
          <span
            className={`material-symbols-outlined ${styles["editIcon"]}`}
            onClick={() => onClickEdit(habit)}
          >
            edit
          </span>
          <span
            className={`material-symbols-outlined ${styles["deleteIcon"]}`}
            onClick={() => onClickDelete(habit)}
          >
            close
          </span>
        </div>
      </div>
      <div className={styles["content"]}>
        <div className={styles["checboxList"]}>
          {dayNames.map((dayName, index) => {
            return (
              <label key={index} className={styles["checkbox"]}>
                <span className={styles["checkboxLabel"]}>{dayName[0]}</span>
                <input
                  type="checkbox"
                  checked={habit.completedDays.includes(dayName)}
                  className={styles["checkboxInput"]}
                  onChange={() => onChangeDayToggle(dayName, habit)}
                />
                <span
                  className={styles["checkboxCustom"]}
                  style={
                    {
                      "--card-color": habit.hexColor,
                    } as React.CSSProperties
                  }
                ></span>
              </label>
            );
          })}
        </div>
        <div className={styles["progressSection"]}>
          <div className={styles["progressBar"]}>
            <div
              className={styles["progressBar__fill"]}
              style={
                {
                  "--card-color": habit.hexColor,
                  "--progress": `${(habit.completedDays.length / 7) * 100}%`,
                } as React.CSSProperties
              }
            ></div>
          </div>
          <span className={styles["progressBar__label"]}>
            {habit.completedDays.length}/7 days completed
          </span>
        </div>
      </div>
    </div>
  );
}
