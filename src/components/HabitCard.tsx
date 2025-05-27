import styles from "../styles/components/HabitCard.module.css";

const daysLabels: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sataturday",
  "Sunday"
];

interface HabitCardProp {
  title: string;
  color: string;
  completedDays: string[];
  onToggleDay: (day: string) => void,
  completed: boolean,
}

export default function HabitCard({ title, color, completedDays, onToggleDay, completed }: HabitCardProp) {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}
        style={{
          "--card-color": color
        } as React.CSSProperties}>
        <div className={styles.card__header__title}>
          <span className={styles.title}>{title}</span>
          <span className={`material-symbols-outlined 
            ${styles.starIcon} 
            ${completed ? styles.starIconShown : ""}`}>
            stars
          </span>
        </div>
        <button className={styles.closeIcon}>x</button>
      </div>
      <div className={styles.content}>
        <div className={styles.checboxList}>
          {
            daysLabels.map((dayLabel, index) => {
              return (
                <label
                  key={index}
                  className={styles.checkbox}>
                  <span className={styles.checkboxLabel}>{dayLabel[0]}</span>
                  <input
                    type="checkbox"
                    checked={completedDays.includes(dayLabel)}
                    className={styles.checkboxInput}
                    onChange={() => onToggleDay(dayLabel)}
                  />
                  <span className={styles.checkboxCustom} style={{
                    "--card-color": color,
                  } as React.CSSProperties}></span>
                </label>
              )
            })
          }

        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressBar__track}>
            <div className={styles.progressBar__fill}
              style={{
                "--card-color": color,
                "--progress": `${(completedDays.length / 7) * 100}%`
              } as React.CSSProperties}
            ></div>
          </div>
          <span className={styles.progressBar__label}>{completedDays.length}/7 days completed</span>
        </div>
      </div>
    </div>
  );
}